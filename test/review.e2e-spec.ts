import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { CreateReviewDto } from '../src/review/dto/create-review.dto';
import { Types, disconnect } from 'mongoose';
import { REVIEW_NOT_FOUND } from '../src/review/review.constants';

const productId = new Types.ObjectId().toHexString();

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

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    it('/review/create (POST) - success', async () => {
        const res = await request(app.getHttpServer()).post('/review/create').send(testDto).expect(201);

        createdId = res.body._id;
        expect(createdId).toBeDefined();

        return res;
    });

    it('/review/create (POST) - failed', async () => {
        const res = await request(app.getHttpServer())
            .post('/review/create')
            .send({
                ...testDto,
                rating: 0,
            })
            .expect(400);

        console.log(res.body);

        return res;
    });

    it('/review/by-product/:productId (GET) - success', async () => {
        const res = await request(app.getHttpServer())
            .get('/review/by-product/' + productId)
            .expect(200);

        expect(res.body.length).toBe(1);

        return res;
    });

    it('/review/by-product/:productId (GET) - failed', async () => {
        const res = await request(app.getHttpServer())
            .get('/review/by-product/' + new Types.ObjectId().toHexString())
            .expect(200);

        expect(res.body.length).toBe(0);

        return res;
    });

    it('/review/:id (DELETE) - success', () => {
        return request(app.getHttpServer())
            .delete('/review/' + createdId)
            .expect(200);
    });

    it('/review/:id (DELETE) - failed', () => {
        return request(app.getHttpServer())
            .delete('/review/' + new Types.ObjectId().toHexString())
            .expect(404, {
                statusCode: 404,
                message: REVIEW_NOT_FOUND,
            });
    });

    afterAll(() => {
        disconnect();
    });
});
