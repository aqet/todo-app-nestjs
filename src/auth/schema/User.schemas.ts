import { Prop, Schema } from "@nestjs/mongoose";
import { SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import * as bcrypt from 'bcrypt';

export type UserDocument = User & Document;
@Schema({timestamps: true})
export class User extends Document{
    @Prop({unique: true, required: true})
    Username: string;

    @Prop()
    email: string;

    @Prop({required: true, select: false, })
    password: string;

    @Prop({default: true})
    isLogged: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);