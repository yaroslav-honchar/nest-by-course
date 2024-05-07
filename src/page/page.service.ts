import { Injectable } from '@nestjs/common';
import { CreatePageDto } from './dto/create-page.dto';
import { InjectModel } from 'nestjs-typegoose';
import { PageModel } from './page.model';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { FindPageDto } from './dto/find-page.dto';
import slugify from 'slugify';

@Injectable()
export class PageService {
    constructor(@InjectModel(PageModel) private readonly topPageModel: ModelType<PageModel>) {}

    async getById(id: string) {
        return this.topPageModel.findById(id).exec();
    }

    async getByAlias(alias: string) {
        return this.topPageModel.find({ alias }).exec();
    }

    async create(dto: CreatePageDto) {
        let alias = slugify(dto.title, { lower: true });
        alias += `-${Date.now()}`;

        return this.topPageModel.create({ ...dto, alias });
    }

    async updateById(id: string, dto: CreatePageDto) {
        let newAlias = slugify(dto.title, { lower: true });
        newAlias += `-${Date.now()}`;

        return this.topPageModel.findByIdAndUpdate(id, { ...dto, alias: newAlias }, { new: true }).exec();
    }

    async delete(id: string) {
        return this.topPageModel.findByIdAndDelete(id).exec();
    }

    async find(dto: FindPageDto) {
        return this.topPageModel
            .aggregate([
                {
                    $match: {
                        firstCategory: dto.firstCategory,
                    },
                },
            ])
            .exec();
    }
}
