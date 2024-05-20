import { Controller, HttpCode, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { FileElementResponse } from './dto/file-element.response';
import { FilesService } from './files.service';
import { MFile } from './mfile.class';

@Controller('files')
export class FilesController {
    constructor(private readonly filesService: FilesService) {}

    @Post('upload')
    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    @UseInterceptors(FileInterceptor('files'))
    async uploadFile(@UploadedFile('file') file: Express.Multer.File): Promise<FileElementResponse[]> {
        const saveArr: MFile[] = [new MFile(file)];

        if (file.mimetype.includes('image')) {
            const webPBuffer = await this.filesService.convertToWebp(file.buffer);

            saveArr.push(
                new MFile({
                    originalname: `${file.originalname.split('.')[0]}.webp`,
                    buffer: webPBuffer,
                }),
            );
        }

        return this.filesService.saveFiles(saveArr);
    }
}
