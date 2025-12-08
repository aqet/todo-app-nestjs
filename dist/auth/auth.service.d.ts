import { UserDto } from './dto/user.dto';
import { User } from './schema/User.schemas';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private UserModel;
    private jwtService;
    constructor(UserModel: Model<User>, jwtService: JwtService);
    user: UserDto[];
    register(user: UserDto): Promise<{
        token: string;
        Username: string;
        isLogged: boolean;
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
    }>;
    getuserName(id: any): Promise<(import("mongoose").Document<unknown, {}, User, {}, {}> & User & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
}
