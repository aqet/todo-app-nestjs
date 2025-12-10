import { UserDto } from './dto/user.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    readonly authservice: AuthService;
    constructor(authservice: AuthService);
    register(user: UserDto): Promise<{
        token: string;
        Username: string;
        isLogged: boolean;
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
        Username: string | undefined;
        isLogged: boolean | undefined;
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
}
