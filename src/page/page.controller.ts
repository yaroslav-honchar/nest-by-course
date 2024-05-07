import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { FindPageDto } from './dto/find-page.dto';
import { CreatePageDto } from './dto/create-page.dto';
import { PageService } from './page.service';
import { PAGE_BY_ALIAS_NOT_FOUND_ERROR, PAGE_BY_ID_NOT_FOUND_ERROR } from './page.constants';
import { IdValidationPipe } from '../pipes/ad-validation.pipe';

@Controller('page')
export class PageController {
    constructor(private readonly pageService: PageService) {}

    @Post('create')
    async save(@Body() dto: CreatePageDto) {
        return this.pageService.create(dto);
    }

    @Get(':id')
    async getById(@Param('id', IdValidationPipe) id: string) {
        const page = await this.pageService.getById(id);
        if (!page) {
            throw new NotFoundException(PAGE_BY_ID_NOT_FOUND_ERROR);
        }

        return page;
    }

    @Patch(':id')
    async patch(@Param('id', IdValidationPipe) id: string, @Body() dto: CreatePageDto) {
        return this.pageService.updateById(id, dto);
    }

    @Get('by-alias/:alias')
    async getAlias(@Param('alias') alias: string) {
        const page = await this.pageService.getByAlias(alias);
        if (!page) {
            throw new NotFoundException(PAGE_BY_ALIAS_NOT_FOUND_ERROR);
        }

        return page;
    }

    @Delete(':id')
    async delete(@Param('id', IdValidationPipe) id: string) {
        return this.pageService.delete(id);
    }

    @Post('find')
    async find(@Body() dto: FindPageDto) {
        return this.pageService.find(dto);
    }
}
