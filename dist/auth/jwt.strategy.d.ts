import { Model } from 'mongoose';
import { User } from './schema/User.schemas';
declare const jwtStrategy_base: new (...args: any) => any;
export declare class jwtStrategy extends jwtStrategy_base {
    private UserModel;
    constructor(UserModel: Model<User>);
    validate(payload: any): Promise<(import("mongoose").Document<unknown, {}, User, {}, {}> & User & Required<{
        _id: import("mongoose").Types.ObjectId;
    }> & {
        __v: number;
    }) | null>;
}
export {};
