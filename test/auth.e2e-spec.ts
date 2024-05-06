import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { disconnect } from 'mongoose';
import { AuthDto } from '../src/auth/dto/auth.dto';

const authDto: AuthDto = {
    login: 'dart.vader@gmail.com',
    password: 'qwe123QWE!@#',
};

describe('AuthController (e2e)', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/auth/login (POST) - success', async () => {
        const res = await request(app.getHttpServer()).post('/auth/login').send(authDto).expect(200);

        return res;
    });

    afterAll(() => {
        disconnect();
    });
});
