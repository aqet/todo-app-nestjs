import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { User } from './schema/User.schemas';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private UserModel: Model<User>, private jwtService: JwtService) {}
  user: UserDto[] = [];

  async register(user: UserDto) {
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
    const newUser = new this.UserModel(user);
    const myUser = await newUser.save();

    const token = this.jwtService.sign({ Username: myUser.Username, isLogged: myUser.isLogged, id: myUser?.id });
    // this.user.push(user)
    return { token , Username: myUser.Username, isLogged: myUser.isLogged}
  }

  async logout(user: any) {
    return await this.UserModel.findOneAndUpdate(
      { Username: user.Username },
      { $set: { isLogged: false } },
      { new: true },
    );
  }

  async login(user: any) {
    const userFound = await this.UserModel.findOne({ Username: user.Username }).select('+password');

    if (!userFound) throw new UnauthorizedException('Utilisateur introuvable');

    const passwordValid = await bcrypt.compare(
      user.password,
      userFound.password,
    );

    if (!passwordValid) throw new UnauthorizedException('Mot de passe incorrect');

    const myUser = await this.UserModel.findOneAndUpdate(
      { Username: user.Username },
      { $set: { isLogged: true } },
      { new: true },
    );

    const token = this.jwtService.sign({ Username: myUser?.Username, isLogged: myUser?.isLogged, id: myUser?.id });
    // this.user.push(user)
    return { token , Username: myUser?.Username, isLogged: myUser?.isLogged}
  }

  async getuserName(id: any){
    
    return await this.UserModel.findById(id.id).select("Username");
  }
}
