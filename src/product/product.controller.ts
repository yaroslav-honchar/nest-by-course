import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    NotFoundException,
    Param,
    Patch,
    Post,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { FindProductDto } from './dto/find-product.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductService } from './product.service';
import {
    DELETE_PRODUCT_NOT_FOUND_ERROR,
    PRODUCT_NOT_FOUND_ERROR,
    UPDATE_PRODUCT_NOT_FOUND_ERROR,
} from './product.constants';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @HttpCode(201)
    @Post('create')
    async create(@Body() dto: CreateProductDto) {
        return this.productService.create(dto);
    }

    @Get(':id')
    async get(@Param('id') id: string) {
        const product = await this.productService.findById(id);
        if (!product) {
            throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR);
        }

        return product;
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        const deletedProduct = await this.productService.deleteById(id);
        if (!deletedProduct) {
            throw new NotFoundException(DELETE_PRODUCT_NOT_FOUND_ERROR);
        }
    }

    @Patch(':id')
    async patch(@Param('id') id: string, @Body() dto: CreateProductDto) {
        const product = await this.productService.updateById(id, dto);
        if (!product) {
            throw new NotFoundException(UPDATE_PRODUCT_NOT_FOUND_ERROR);
        }

        return product;
    }

    @UsePipes(new ValidationPipe())
    @HttpCode(200)
    @Post('find')
    async find(@Body() dto: FindProductDto) {
        return this.productService.findWithReviews(dto);
    }
}
