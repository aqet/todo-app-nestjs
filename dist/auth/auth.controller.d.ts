import { UserDto } from './dto/user.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    readonly authservice: AuthService;
    constructor(authservice: AuthService);
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
    logout(user: {
        Username: string;
    }): Promise<(import("mongoose").Document<unknown, {}, import("./schema/User.schemas").User, {}, {}> & import("./schema/User.schemas").User & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    login(user: {
        username: string;
        password: string;
    }): Promise<{
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
    getuserName(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./schema/User.schemas").User, {}, {}> & import("./schema/User.schemas").User & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
    refreshToken(token: {
        token: string;
    }): Promise<{
        token: string;
        RefreshToken: `${string}-${string}-${string}-${string}-${string}`;
    }>;
    getMe(req: any): any;
    uploadImage(Username: any, file: Express.Multer.File): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("./schema/User.schemas").User, {}, {}> & import("./schema/User.schemas").User & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, import("./schema/User.schemas").User, {}, {}> & import("./schema/User.schemas").User & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, {}, import("./schema/User.schemas").User, "findOneAndUpdate", {}>;
    update(body: {}): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("./schema/User.schemas").User, {}, {}> & import("./schema/User.schemas").User & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, import("./schema/User.schemas").User, {}, {}> & import("./schema/User.schemas").User & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }, {}, import("./schema/User.schemas").User, "findOneAndUpdate", {}>;
}
