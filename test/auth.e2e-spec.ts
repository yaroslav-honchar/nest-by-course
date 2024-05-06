import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { AuthDto } from '../src/auth/dto/auth.dto';
import * as request from 'supertest';
import { disconnect } from 'mongoose';
import { USER_NOT_FOUND_ERROR, WRONG_PASSWORD_ERROR } from '../src/auth/auth.constants';

const authDto: AuthDto = {
    login: 'dart.vader@gmail.com',
    password: 'qwe123QWE!@#',
};

describe('AuthController (e2e)', () => {
    let app: INestApplication;
    let auth_token: string;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('(POST) /auth/login/ - success', async () => {
        const res = await request(app.getHttpServer()).post('/auth/login/').send(authDto).expect(200);
        auth_token = res.body.access_token;
        expect(auth_token).toBeDefined();

        return res;
    });

    it('(POST) /auth/login/ - failure email', async () => {
        return await request(app.getHttpServer())
            .post('/auth/login/')
            .send({
                ...authDto,
                login: 'wrong_login@test.com',
            })
            .expect(401, {
                statusCode: 401,
                message: USER_NOT_FOUND_ERROR,
                error: 'Unauthorized',
            });
    });

    it('(POST) /auth/login/ - failure password', async () => {
        return await request(app.getHttpServer())
            .post('/auth/login/')
            .send({
                ...authDto,
                password: 'wrong_password',
            })
            .expect(401, {
                statusCode: 401,
                message: WRONG_PASSWORD_ERROR,
                error: 'Unauthorized',
            });
    });

    afterAll(() => {
        disconnect();
    });
});
