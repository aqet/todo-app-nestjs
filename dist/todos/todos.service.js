"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodosService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const Todo_schemas_1 = require("./schemas/Todo.schemas");
const mongoose_2 = require("mongoose");
const mail_service_1 = require("../mail/mail.service");
let TodosService = class TodosService {
    TodoModel;
    mailservice;
    todos = [];
    constructor(TodoModel, mailservice) {
        this.TodoModel = TodoModel;
        this.mailservice = mailservice;
    }
    initialisationTodo(initTodo) {
        const init = new this.TodoModel(initTodo);
        return init.save();
    }
    async ensureColumnsExist() {
        const columns = ['A faire', 'En cours', 'Terminé'];
        for (const columnTitle of columns) {
            const exists = await this.TodoModel.findOne({ title: columnTitle });
            if (!exists) {
                await this.TodoModel.create({
                    title: columnTitle,
                    tasks: [],
                });
                console.log(`✅ Colonne "${columnTitle}" créée`);
            }
        }
    }
    getAllTodos() {
        return this.TodoModel.find();
    }
    getOne(name) {
        return this.TodoModel.findOne({ name: name });
    }
    async createTodo(createTodoDto, user) {
        const data = Object.assign({
            name: createTodoDto.info.task,
            date: new Date(),
            update: new Date(),
            user: user._id,
        });
        console.log(data);
        await this.ensureColumnsExist();
        const todo = await this.TodoModel.findOneAndUpdate({ title: 'A faire' }, {
            $push: {
                tasks: data,
            },
        }, { new: true });
        if (!todo) {
            throw new Error('Todo non trouvé');
        }
        await this.mailservice.sendEmail({
            to: createTodoDto.info.mail,
            username: createTodoDto.info.user,
            title: createTodoDto.info.task,
        }, 'task-created');
    }
    create(newTodo) {
        console.log(newTodo);
        return this.todos[0].tasks.push(newTodo?.task);
    }
    async update(todo) {
        const updatetodo = await this.delete(todo.last, todo.task.name).then(() => {
            return this.TodoModel.findOneAndUpdate({ title: todo.next }, {
                $push: {
                    tasks: {
                        name: todo.task.name,
                        date: todo.task.date,
                        update: new Date(),
                        user: todo.task.user,
                    },
                },
            });
        });
        await this.mailservice.sendEmail({
            to: todo.mail,
            username: todo.user,
            title: todo.task.name,
            last: todo.last,
            next: todo.next,
        }, 'task-update');
    }
    delete(title, taskId) {
        return this.TodoModel.findOneAndUpdate({ title: title }, { $pull: { tasks: { _id: taskId } } }, { new: true });
    }
};
exports.TodosService = TodosService;
exports.TodosService = TodosService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(Todo_schemas_1.Todo.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mail_service_1.MailService])
], TodosService);
//# sourceMappingURL=todos.service.js.map