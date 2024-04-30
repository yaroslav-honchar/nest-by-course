import { Body, Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { TopPageModel } from './top-page.model';
import { FindTopPageDto } from './dto/find-top-page.dto';

@Controller('top-page')
export class TopPageController {
    @HttpCode(200)
    @Get(':alias')
    async get(@Param('alias') alias: string) {
        console.log(alias);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        console.log(id);
    }

    @Post('save')
    async save(@Body() dto: TopPageModel) {
        console.log(dto);
    }

    @HttpCode(200)
    @Post('find')
    async find(@Body() dto: FindTopPageDto) {
        console.log(dto);
    }
}
