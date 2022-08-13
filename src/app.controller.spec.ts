import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { User } from './user/user.entity';
import { UserService } from './user/user.service';

describe('AppController', () => {
  let appController: AppController;
  let userService: UserService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      // providers: [AppService],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
    userService = app.get(UserService);
  });

  describe('Register', function () {
    it('should return user response', async () => {
      // Given
      const requestBody = {
        email: 'xxx@sss.com',
        username: 'xxx',
        password: '123456',
      };
      jest.spyOn(userService, 'createUser').mockResolvedValue({ user: {} });

      // When
      const response = await appController.register(requestBody);

      // Then
      expect(userService.createUser).toBeCalledTimes(1);
      expect(response).toHaveProperty('user', expect.any(Object));
    });
  });
  // describe('root', () => {
  //   it('should return "Hello World!"', () => {
  //     expect(appController.getHello()).toBe('Hello World!');
  //   });
  // });
});
