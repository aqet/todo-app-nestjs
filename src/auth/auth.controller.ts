import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(public readonly authservice: AuthService) {}

  @Post('register')
  register(@Body() user: UserDto) {
    // const data = this.authservice.register(user);
    // console.log(user);
    
    // return { 
    //     users: user,
    //     isloged: data
    // };
    // localStorage.setItem('isloged', JSON.stringify(true))

    return this.authservice.register(user)
  }

  @Post('logout')
  logout(@Body() user: {Username: string}) { 
    return this.authservice.logout(user);
  }

  @Post('login')
  login(@Body() user: {username: string, password: string}) {
    return this.authservice.login(user);
  }

  @Post('user')
  @UseGuards(AuthGuard())
  getuserName(@Body() id: string){
    return this.authservice.getuserName(id)
  }

}
