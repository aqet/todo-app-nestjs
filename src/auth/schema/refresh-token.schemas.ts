import { Prop, Schema } from "@nestjs/mongoose";
import { SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import * as bcrypt from 'bcrypt';

export type RefreshTokenDocument = RefreshToken & Document;
@Schema({timestamps: true})
export class RefreshToken extends Document{
    @Prop({required: true})
    RefreshToken: string; 

    @Prop({ required: true, type: mongoose.Types.ObjectId})
    userId: mongoose.Types.ObjectId;

    @Prop({required: true})
    expiryDate: Date;
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);