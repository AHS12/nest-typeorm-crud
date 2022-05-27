import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppService } from '../src/app.service';

jest.setTimeout(1000000);

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should get an object', async () => {
    const result = app.get(AppService).getHello();
    //assertion
    expect(result).toStrictEqual({
      message: 'Hello World!',
    });
  });
});
