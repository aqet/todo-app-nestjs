import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
export declare class TodosController {
    private readonly todosService;
    constructor(todosService: TodosService);
    initTodo(initTodo: CreateTodoDto): Promise<import("mongoose").Document<unknown, {}, import("./schemas/Todo.schemas").Todo, {}, {}> & import("./schemas/Todo.schemas").Todo & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    findAll(): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("./schemas/Todo.schemas").Todo, {}, {}> & import("./schemas/Todo.schemas").Todo & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[], import("mongoose").Document<unknown, {}, import("./schemas/Todo.schemas").Todo, {}, {}> & import("./schemas/Todo.schemas").Todo & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("./schemas/Todo.schemas").Todo, "find", {}>;
    createTodo(newTodo: any, req: any): Promise<void>;
    update(todo: CreateTodoDto[]): Promise<void>;
    delete(title: any, taskName: any): import("mongoose").Query<(import("mongoose").Document<unknown, {}, import("./schemas/Todo.schemas").Todo, {}, {}> & import("./schemas/Todo.schemas").Todo & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }) | null, import("mongoose").Document<unknown, {}, import("./schemas/Todo.schemas").Todo, {}, {}> & import("./schemas/Todo.schemas").Todo & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, {}, import("./schemas/Todo.schemas").Todo, "findOneAndUpdate", {}>;
}
