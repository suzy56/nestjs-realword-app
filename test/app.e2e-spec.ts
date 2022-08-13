import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as request from 'supertest';
const ormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 49154,
  username: 'realworld',
  password: '123456',
  database: 'nestjs_test',
  entities: ['src/**/*.entity{.ts,.js}'],
  // entities: [User],
  synchronize: true,
  dropSchema: true,
};

describe('AppController (e2e)', () => {
  let app;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(ormConfig), AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
  it('/auth/register (POST)', async () => {
    const requestBody = {
      email: 'mutoe@foxmail.com',
      username: 'mutoe',
      password: '12345678',
    };
    await request(app.getHttpServer())
      .post('/auth/register')
      .send(requestBody)
      .expect(201);
  });
});
