import { UserDto } from './dto/user.dto';
import { User } from './schema/User.schemas';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { RefreshToken } from './schema/refresh-token.schemas';
import { MailService } from 'src/mail/mail.service';
export declare class AuthService {
    private UserModel;
    private RefreshTokenModel;
    private jwtService;
    private readonly mailservice;
    constructor(UserModel: Model<User>, RefreshTokenModel: Model<RefreshToken>, jwtService: JwtService, mailservice: MailService);
    user: UserDto[];
    register(user: UserDto): Promise<{
        token: string;
        id: any;
        Username: string;
        Mail: string;
        isLogged: boolean;
        imageUrl: string;
        createdAt: any;
        updatedAt: any;
        RefreshToken: `${string}-${string}-${string}-${string}-${string}`;
    }>;
    logout(user: any): Promise<(import("mongoose").Document<unknown, {}, User, {}, {}> & User & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    login(user: any): Promise<{
        token: string;
        id: any;
        Username: string | undefined;
        Mail: string | undefined;
        isLogged: boolean | undefined;
        imageUrl: string;
        createdAt: any;
        updatedAt: any;
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
    updateProfile(user: any): import("mongoose").Query<(import("mongoose").Document<unknown, {}, User, {}, {}> & User & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, User, {}, {}> & User & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, {}, User, "findOneAndUpdate", {}>;
}
