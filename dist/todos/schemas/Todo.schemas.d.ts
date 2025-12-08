import mongoose from 'mongoose';
import { User } from 'src/auth/schema/User.schemas';
export declare class Todo {
    title: string;
    tasks: {
        name: string;
        date: Date;
        update: Date;
        user: User;
    }[];
}
export declare const TodoSchema: mongoose.Schema<Todo, mongoose.Model<Todo, any, any, any, mongoose.Document<unknown, any, Todo, any, {}> & Todo & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Todo, mongoose.Document<unknown, {}, mongoose.FlatRecord<Todo>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<Todo> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
