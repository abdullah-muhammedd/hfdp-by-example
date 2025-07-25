/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UserModule } from 'src/user/user.module';

describe('UserController (e2e)', () => {
  let app: INestApplication;
  let apiKey: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create a new user', async () => {
    const res = await request(app.getHttpServer())
      .post('/user/create')
      .send({ email: 'test@example.com', isPro: false })
      .expect(201);

    expect(res.body.id).toBeDefined();
    expect(res.body.apiKey).toBeDefined();
    apiKey = res.body.apiKey;
  });

  it('should validate API key', async () => {
    const res = await request(app.getHttpServer())
      .post('/user/validate')
      .send({ apiKey })
      .expect(201);

    expect(res.body.valid).toBe(true);
    expect(res.body.user.apiKey).toBe(apiKey);
  });

  it('should get current user with ApiKeyGuard', async () => {
    const res = await request(app.getHttpServer())
      .get('/user/me')
      .set('x-api-key', apiKey)
      .expect(200);

    expect(res.body.apiKey).toBe(apiKey);
  });

  it('should reject invalid API key on /user/me', async () => {
    await request(app.getHttpServer())
      .get('/user/me')
      .set('x-api-key', 'invalid-key')
      .expect(401);
  });
});
