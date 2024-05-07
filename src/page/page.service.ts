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

    async create(dto: CreatePageDto) {
        const alias = this.generateAlias(dto.title);

        return this.topPageModel.create({ ...dto, alias });
    }

    async getById(id: string) {
        return this.topPageModel.findById(id).exec();
    }

    async getByAlias(alias: string) {
        return this.topPageModel.findOne({ alias }).exec();
    }

    async updateById(id: string, dto: CreatePageDto) {
        const newAlias = this.generateAlias(dto.title);

        return this.topPageModel.findByIdAndUpdate(id, { ...dto, alias: newAlias }, { new: true }).exec();
    }

    async deleteById(id: string) {
        return this.topPageModel.findByIdAndDelete(id).exec();
    }

    async find({ firstCategory }: FindPageDto) {
        return this.topPageModel
            .find(
                { firstCategory },
                {
                    alias: 1,
                    secondCategory: 1,
                    title: 1,
                },
            )
            .exec();
    }

    generateAlias(title: string) {
        let alias = slugify(title, { lower: true });
        alias += `-${Date.now()}`;

        return alias;
    }
}
