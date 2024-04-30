import { Body, Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { ReviewModel } from './review.model';

@Controller('review')
export class ReviewController {
    @HttpCode(201)
    @Post('create')
    async create(@Body() dto: Omit<ReviewModel, '_id'>) {
        console.log(dto);
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        console.log(id);
    }

    @Get('by-product/:productId')
    async getByProduct(@Param('productId') productId: string) {
        console.log(productId);
    }
}
