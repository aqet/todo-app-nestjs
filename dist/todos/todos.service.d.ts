import { CreateTodoDto } from './dto/create-todo.dto';
import { Todo } from './schemas/Todo.schemas';
import { Model } from 'mongoose';
import { User } from 'src/auth/schema/User.schemas';
import { MailService } from 'src/mail/mail.service';
export declare class TodosService {
    private TodoModel;
    private readonly mailservice;
    todos: any;
    constructor(TodoModel: Model<Todo>, mailservice: MailService);
    initialisationTodo(initTodo: CreateTodoDto): Promise<import("mongoose").Document<unknown, {}, Todo, {}, {}> & Todo & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    getAllTodos(): import("mongoose").Query<(import("mongoose").Document<unknown, {}, Todo, {}, {}> & Todo & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[], import("mongoose").Document<unknown, {}, Todo, {}, {}> & Todo & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, Todo, "find", {}>;
    getOne(name: string): import("mongoose").Query<(import("mongoose").Document<unknown, {}, Todo, {}, {}> & Todo & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, Todo, {}, {}> & Todo & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, Todo, "findOne", {}>;
    createTodo(createTodoDto: any, user: User): Promise<void>;
    create(newTodo: any): any;
    update(todo: any): Promise<void>;
    delete(title: string, taskName: string): import("mongoose").Query<(import("mongoose").Document<unknown, {}, Todo, {}, {}> & Todo & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, Todo, {}, {}> & Todo & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, Todo, "findOneAndUpdate", {}>;
}
