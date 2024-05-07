import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { PageModule } from './page/page.module';
import { ReviewModule } from './review/review.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypegooseModule } from 'nestjs-typegoose';
import { getMongoConfig } from './configs/mongo.config';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypegooseModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: getMongoConfig,
        }),
        AuthModule,
        ProductModule,
        PageModule,
        ReviewModule,
    ],
})
export class AppModule {}
