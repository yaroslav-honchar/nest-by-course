import { index, prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export enum LevelCategory {
    Courses,
    Services,
    Books,
    Products,
}

export class HhData {
    @prop()
    count: number;

    @prop()
    juniorSalary: number;

    @prop()
    middleSalary: number;

    @prop()
    seniorSalary: number;
}

export class PageAdvantage {
    @prop()
    title: string;

    @prop()
    description: string;
}

export interface Model extends Base {}

@index({
    '$**': 'text',
})
export class PageModel extends TimeStamps {
    @prop({ enum: () => LevelCategory })
    firstCategory: LevelCategory;

    @prop()
    secondCategory: string;

    @prop({ unique: true })
    alias: string;

    @prop()
    title: string;

    @prop()
    category: string;

    @prop({ type: () => HhData })
    hh?: HhData;

    @prop({ type: () => [PageAdvantage] })
    advantages: PageAdvantage[];

    @prop()
    seoText: string;

    @prop()
    tagsTitle: string;

    @prop({ type: () => [String] })
    tags: string[];
}
