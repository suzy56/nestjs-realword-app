import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async createUser(user: {
    email: string;
    username: string;
    password: string;
  }): Promise<any> {
    return this.userRepository.save(Object.assign(new User(), user));
  }

  async findOne(username: string) {
    return this.userRepository.findOne({ where: { username } });
  }
}
