import { Body, Controller, Post, Get } from '@nestjs/common';
import { UserService } from './user/user.service';
// import { AppService } from './app.service';
@Controller()
export class AppController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getHello(): string {
    return 'Hello World!';
  }

  @Post('/auth/register')
  register(
    @Body() requestBody: { email: string; username: string; password: string }
  ): any {
    console.log(requestBody);
    return this.userService.createUser(requestBody);
  }
}
