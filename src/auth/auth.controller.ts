import { Body, Controller, Get, Post, Req, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { File } from 'buffer';
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

    return this.authservice.register(user);
  }

  @Post('logout')
  logout(@Body() user: { Username: string }) {
    return this.authservice.logout(user);
  }

  @Post('login')
  login(@Body() user: { username: string; password: string }) {
    return this.authservice.login(user);
  }
 
  @Post('user')
  @UseGuards(AuthGuard())
  getuserName(@Body() id: string) {
    return this.authservice.getuserName(id);
  }

  @Post('refresh')
  refreshToken(@Body() token: { token: string }) {
    console.log(token.token);

    return this.authservice.refreshToken(token.token)
  }

  @Get('me')
  @UseGuards(AuthGuard())
  getMe(@Req() req: any) {
    return req.user;
  }

  @Post('update-photo')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueName =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueName + extname(file.originalname)); 
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          return cb(new Error('Seules les images sont autorisées!'), false);
        }
        cb(null, true);
      },
      limits: { fileSize: 2 * 1024 * 1024 },
    }),
  )
  uploadImage(@Body() Username, @UploadedFile() file: Express.Multer.File) {
    console.log({
      "username" :Username.Username,
      "file":file 
    });
    
    const user={
      Username: Username.Username,
      imageUrl: `/uploads/${file.filename}`
    }
    
    return this.authservice.updateProfile(user);
  }

  @Post('update')
  update(@Body() body:{}){
    return this.authservice.updateProfile(body['user'])
  }
  
}
