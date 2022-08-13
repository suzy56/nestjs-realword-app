import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            save: jest.fn(() => true),
            fundOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get(getRepositoryToken(User));
  });

  it('should find user correctly', async function () {
    const user = {
      email: 'mutoe@foxmail.com',
      username: 'mutoe',
      password: '12345678',
    };
    jest.spyOn(repository, 'findOne').mockResolvedValue(user as unknown as User);
    const userResult = await service.findOne(user.username);
    expect(userResult).toBe(user)
    expect(repository.findOne).toBeCalledWith({
      where: { username: user.username },
    })
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  it('should create user correctly', async () => {
    const user = {
      email: 'hahha@123.com',
      username: 'haha',
      password: '123456',
    };
    await service.createUser(user);

    expect(repository.save).toBeCalledWith(Object.assign(new User(), user));
  });
});
