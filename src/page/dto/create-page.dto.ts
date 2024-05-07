import { IsArray, IsEnum, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { LevelCategory } from '../page.model';

export class HhDataDto {
    @IsNumber()
    count: number;

    @IsNumber()
    juniorSalary: number;

    @IsNumber()
    middleSalary: number;

    @IsNumber()
    seniorSalary: number;
}

export class PageAdvantageDto {
    @IsString()
    title: string;

    @IsString()
    description: string;
}

export class CreatePageDto {
    @IsEnum(LevelCategory)
    firstCategory: LevelCategory;

    @IsString()
    secondCategory: string;

    @IsString()
    title: string;

    @IsString()
    category: string;

    @ValidateNested()
    @Type(() => HhDataDto)
    hh?: HhDataDto;

    @IsArray()
    @ValidateNested()
    @Type(() => PageAdvantageDto)
    advantages: PageAdvantageDto[];

    @IsString()
    seoText: string;

    @IsString()
    tagsTitle: string;

    @IsArray()
    @IsString({ each: true })
    tags: string[];
}
