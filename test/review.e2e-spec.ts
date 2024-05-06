import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { CreateReviewDto } from '../src/review/dto/create-review.dto';
import { Types, disconnect } from 'mongoose';
import { REVIEW_NOT_FOUND } from '../src/review/review.constants';
import { AuthDto } from '../src/auth/dto/auth.dto';

const productId = new Types.ObjectId().toHexString();

const authDto: AuthDto = {
    login: 'dart.vader@gmail.com',
    password: 'qwe123QWE!@#',
};

const testDto: CreateReviewDto = {
    name: 'Test',
    title: 'Title',
    description: 'Test description',
    rating: 5,
    productId,
};

describe('ReviewController (e2e)', () => {
    let app: INestApplication;
    let createdId: string;
    let auth_token: string;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();

        const res = await request(app.getHttpServer()).post('/auth/login').send(authDto);
        auth_token = res.body.access_token;
    });

    it('(POST) /review/create - success', async () => {
        const res = await request(app.getHttpServer()).post('/review/create').send(testDto).expect(201);

        createdId = res.body._id;
        expect(createdId).toBeDefined();

        return res;
    });

    it('(POST) /review/create - failed', async () => {
        const res = await request(app.getHttpServer())
            .post('/review/create')
            .send({
                ...testDto,
                rating: 0,
            })
            .expect(400);

        return res;
    });

    it('(GET) /review/by-product/:productId - success', async () => {
        const res = await request(app.getHttpServer())
            .get('/review/by-product/' + productId)
            .expect(200);

        expect(res.body.length).toBe(1);

        return res;
    });

    it('(GET) /review/by-product/:productId - failed', async () => {
        const res = await request(app.getHttpServer())
            .get('/review/by-product/' + new Types.ObjectId().toHexString())
            .expect(200);

        expect(res.body.length).toBe(0);

        return res;
    });

    it('(DELETE) /review/:id - success', () => {
        return request(app.getHttpServer())
            .delete('/review/' + createdId)
            .set({
                Authorization: `Bearer ${auth_token}`,
            })
            .expect(200);
    });

    it('(DELETE) /review/:id - failed', () => {
        return request(app.getHttpServer())
            .delete('/review/' + new Types.ObjectId().toHexString())
            .set({
                Authorization: `Bearer ${auth_token}`,
            })
            .expect(404, {
                statusCode: 404,
                message: REVIEW_NOT_FOUND,
            });
    });

    afterAll(() => {
        disconnect();
    });
});
