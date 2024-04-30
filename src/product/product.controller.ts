import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from '@nestjs/common';
import { ProductModel } from './product.model';
import { FindProductDto } from './dto/find-product.dto';

@Controller('product')
export class ProductController {
    @HttpCode(201)
    @Post('create')
    async create(@Body() dto: Omit<ProductModel, '_id'>) {
        console.log(dto);
    }

    @Get(':id')
    async get(@Param('id') id: string) {
        console.log(id);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        console.log(id);
    }

    @Patch(':id')
    async patch(@Param('id') id: string, @Body() dto: ProductModel) {
        console.log(id);
        console.log(dto);
    }

    @HttpCode(200)
    @Post('find')
    async find(@Body() dto: FindProductDto) {
        console.log(dto);
    }
}
