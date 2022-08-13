import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from 'user/user.service';
import { Connection, Repository } from 'typeorm';
import { User } from 'user/user.entity';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 49154,
      username: 'realworld',
      password: '123456',
      database: 'nestjs',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    // TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([User]),
    UserModule,
    AuthModule,
  ],
  exports: [TypeOrmModule],
  controllers: [AppController],
  // providers: [
  //   UserService,
  //   {
  //     provide: getRepositoryToken(User),
  //     useClass: Repository,
  //   },
  // ]
  // providers: [AppService],
})
export class AppModule {
}
