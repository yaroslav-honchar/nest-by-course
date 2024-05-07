import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    NotFoundException,
    Param,
    Patch,
    Post, UseGuards,
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
import { IdValidationPipe } from '../pipes/ad-validation.pipe';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @UseGuards(JwtAuthGuard)
    @HttpCode(201)
    @Post('create')
    async create(@Body() dto: CreateProductDto) {
        return this.productService.create(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async get(@Param('id', IdValidationPipe) id: string) {
        const product = await this.productService.findById(id);
        if (!product) {
            throw new NotFoundException(PRODUCT_NOT_FOUND_ERROR);
        }

        return product;
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id', IdValidationPipe) id: string) {
        const deletedProduct = await this.productService.deleteById(id);
        if (!deletedProduct) {
            throw new NotFoundException(DELETE_PRODUCT_NOT_FOUND_ERROR);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    async patch(@Param('id', IdValidationPipe) id: string, @Body() dto: CreateProductDto) {
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
