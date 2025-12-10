import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schema/User.schemas';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtStrategy } from './jwt.strategy';
import { RefreshToken, RefreshTokenSchema } from './schema/refresh-token.schemas';

@Module({
  controllers: [AuthController],
  providers: [AuthService, jwtStrategy],
  imports: [
    MongooseModule.forFeature([{
      name: User.name,
      schema: UserSchema
    },
    {
      name: RefreshToken.name,
      schema: RefreshTokenSchema
    }]),
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.registerAsync({
      // inject: [ConfigService]
      useFactory: () => ({
        secret: 'SoSecret',
        signOptions: {expiresIn: '1m'}
      })
      
    })
  ],
  exports: [jwtStrategy, PassportModule]
})
export class AuthModule {}
