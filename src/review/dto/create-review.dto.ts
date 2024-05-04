import { IsString, IsNotEmpty, IsNumber, IsMongoId, Max, Min } from 'class-validator';

export class CreateReviewDto {
    @IsString()
    name: string;

    @IsString()
    title: string;

    @IsString()
    description: string;

    @Max(5, {
        message: 'Rating can not be bigger than 5',
    })
    @Min(1, {
        message: 'Rating can not be less than 1',
    })
    @IsNumber()
    rating: number;

    @IsMongoId()
    productId: string;
}
