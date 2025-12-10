import { UserDto } from './dto/user.dto';
import { User } from './schema/User.schemas';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from './schema/refresh-token.schemas';
export declare class AuthService {
    private UserModel;
    private RefreshTokenModel;
    private jwtService;
    constructor(UserModel: Model<User>, RefreshTokenModel: Model<RefreshToken>, jwtService: JwtService);
    user: UserDto[];
    register(user: UserDto): Promise<{
        token: string;
        Username: string;
        isLogged: boolean;
        RefreshToken: `${string}-${string}-${string}-${string}-${string}`;
    }>;
    logout(user: any): Promise<(import("mongoose").Document<unknown, {}, User, {}, {}> & User & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    login(user: any): Promise<{
        token: string;
        Username: string | undefined;
        isLogged: boolean | undefined;
        RefreshToken: `${string}-${string}-${string}-${string}-${string}`;
    }>;
    getuserName(id: any): Promise<(import("mongoose").Document<unknown, {}, User, {}, {}> & User & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    refreshToken(refreshToken: string): Promise<{
        token: string;
        RefreshToken: `${string}-${string}-${string}-${string}-${string}`;
    }>;
}
