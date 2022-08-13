import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'
import { NEST_SECRET } from 'config'
import { User } from 'user/user.entity'
import { UserModule } from 'user/user.module'
import { AuthService } from './auth.service'


@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: NEST_SECRET,
    }),
  ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
