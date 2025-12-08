import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { User } from './schema/User.schemas';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class jwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectModel(User.name) private UserModel: Model<User>) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'SoSecret',
    });
  }

  async validate(payload: any) {
    const user = await this.UserModel.findById(payload.id);

    if (user?.isLogged === false)
      throw new UnauthorizedException('veuillez vous connecter pour y accéder');

    return user;
  }
}
