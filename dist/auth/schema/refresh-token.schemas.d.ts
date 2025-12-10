import mongoose, { Document } from "mongoose";
export type RefreshTokenDocument = RefreshToken & Document;
export declare class RefreshToken extends Document {
    RefreshToken: string;
    userId: mongoose.Types.ObjectId;
    expiryDate: Date;
}
export declare const RefreshTokenSchema: mongoose.Schema<RefreshToken, mongoose.Model<RefreshToken, any, any, any, mongoose.Document<unknown, any, RefreshToken, any, {}> & RefreshToken & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, RefreshToken, mongoose.Document<unknown, {}, mongoose.FlatRecord<RefreshToken>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<RefreshToken> & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}>;
