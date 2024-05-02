import { ConfigService } from '@nestjs/config';
import { TypegooseModuleOptions } from 'nestjs-typegoose';

const getMongoString = (configService: ConfigService): string => {
    return (
        'mongodb://' +
        configService.get('MONGO_LOGIN') +
        ':' +
        configService.get('MONGO_PASSWORD') +
        '@' +
        configService.get('MONGO_HOST') +
        ':' +
        configService.get('MONGO_PORT') +
        '/' +
        configService.get('MONGO_AUTH_DATABASE')
    );
};

const getMongoOptions = () => ({
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useUnifiedTopology: true,
});

export const getMongoConfig = async (configService: ConfigService): Promise<TypegooseModuleOptions> => {
    return {
        uri: getMongoString(configService),
        ...getMongoOptions(),
    };
};
