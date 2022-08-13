import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            
          },
        },
      ],
    }).compile();

    authService = module.get(AuthService);
    userService = module.get(UserService);
  });

  it('should get user profile after validateUser', async function () {
    const password = '12345678';
    const username = 'mutoe';
    jest
      .spyOn(userService, 'findOne')
      .mockResolvedValue({ username, password } as unknown as User);
    const user = await authService.validateUser(username, password);
    expect(user).toHaveProperty('username', username);
    expect(user).not.toHaveProperty('password');
  });

  it('should return null when invalid password', async () => {
    jest.spyOn(userService, 'findOne').mockResolvedValue(undefined);
    const result = await authService.validateUser('mutoe', 'invalidPassword');
    expect(result).toBeNull();
  });
});
