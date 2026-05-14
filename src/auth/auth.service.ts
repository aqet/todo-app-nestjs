import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { User } from './schema/User.schemas';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from './schema/refresh-token.schemas';
import { randomUUID } from 'crypto';
import { MailService } from 'src/mail/mail.service';
import { log } from 'console';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<User>,
    @InjectModel(RefreshToken.name)
    private RefreshTokenModel: Model<RefreshToken>,
    private jwtService: JwtService,
    private readonly mailservice: MailService,
  ) {}
  user: UserDto[] = [];

  async register(user: UserDto) {
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
    user.imageUrl = ''
    const newUser = new this.UserModel(user);
    const myUser = await newUser.save();

    const token = this.jwtService.sign({
      Username: myUser.Username,
      isLogged: myUser.isLogged,
      id: myUser?.id,

    });

    const RefreshToken = randomUUID();
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 3);

    await this.RefreshTokenModel.create(
      Object.assign({ RefreshToken, userId: myUser?._id, expiryDate }),
    );

    await this.mailservice.sendEmail({
      to: myUser.email,
      username: myUser.Username
    }, 'welcome');

    // this.user.push(user)
    return {
      token,
      id: myUser.id,
      Username: myUser.Username,
      Mail: myUser.email,
      isLogged: myUser.isLogged,
      imageUrl: myUser.imageUrl || '',
      createdAt: myUser.createdAt,
      updatedAt: myUser.updatedAt,
      RefreshToken,
    };

    
  }

  async logout(user: any) {
    return await this.UserModel.findOneAndUpdate(
      { Username: user.Username },
      { $set: { isLogged: false } },
      { new: true },
    );
  }

  async login(user: any) {
    const userFound = await this.UserModel.findOne({
      Username: user.Username,
    }).select('+password');

    if (!userFound) throw new UnauthorizedException('Utilisateur introuvable');

    const passwordValid = await bcrypt.compare(
      user.password,
      userFound.password,
    );

    if (!passwordValid)
      throw new UnauthorizedException('Mot de passe incorrect');

    const myUser = await this.UserModel.findOneAndUpdate(
      { Username: user.Username },
      { $set: { isLogged: true } },
      { new: true },
    );

    const token = this.jwtService.sign({
      Username: myUser?.Username,
      isLogged: myUser?.isLogged,
      id: myUser?.id,
    });

    const RefreshToken = randomUUID();
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 3);

    await this.RefreshTokenModel.create(
      Object.assign({ RefreshToken, userId: myUser?._id, expiryDate }),
    );
    // this.user.push(user)
    return {
      token,
      id: myUser?.id,
      Username: myUser?.Username,
      Mail: myUser?.email,
      isLogged: myUser?.isLogged,
      imageUrl: myUser?.imageUrl || '',
      createdAt: myUser?.createdAt,
      updatedAt: myUser?.updatedAt,
      RefreshToken,
    };
  }

  async getuserName(id: any) {
    return await this.UserModel.findById(id.id).select('-_id');
  }

  async refreshToken(refreshToken: string) {
    const refresh = await this.RefreshTokenModel.findOneAndDelete({
      RefreshToken: refreshToken,
      expiryDate: { $gte: new Date() },
    });

    if (!refresh) throw new UnauthorizedException('refresh token is invalid');

    const myUser = await this.UserModel.findOne({
      _id: refresh.userId,
    });

    const token = this.jwtService.sign({
      Username: myUser?.Username,
      isLogged: myUser?.isLogged,
      id: myUser?.id,
    });

    const RefreshToken = randomUUID();
    const expiryDate = new Date();
    expiryDate.setMinutes(expiryDate.getDate() + 5);

    await this.RefreshTokenModel.create(
      Object.assign({ RefreshToken, userId: myUser?._id, expiryDate }),
    );

    return { token, RefreshToken };
  }

  updateProfile(user: any ) {
    console.log(user);
    
    return this.UserModel.findOneAndUpdate(
      { Username: user.Username},
      {
        $set:  {
          imageUrl: user.imageUrl
        }
      },
      { new: true });
  }


}
