import { Injectable, NotFoundException } from '@nestjs/common';
// import { Todo } from './interfaces/interface.todos';
import { CreateTodoDto } from './dto/create-todo.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Todo } from './schemas/Todo.schemas';
import { Model } from 'mongoose';
import { title } from 'process';
import { use } from 'passport';
import { User } from 'src/auth/schema/User.schemas';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class TodosService {
  todos: any = [];

  constructor(
    @InjectModel(Todo.name) private TodoModel: Model<Todo>,
    private readonly mailservice: MailService,
  ) {}

  initialisationTodo(initTodo: CreateTodoDto) {
    const init = new this.TodoModel(initTodo);
    return init.save();
  }

  getAllTodos() {
    return this.TodoModel.find();
  }

  getOne(name: string) {
    return this.TodoModel.findOne({ name: name });
  }

  async createTodo(createTodoDto: any, user: User) {
    // const updatetodo = {this.todos}

    const data = Object.assign({
      name: createTodoDto.info.task,
      date: new Date(),
      update: new Date(),
      user: user._id,
    });
    console.log(data);

    const todo = await this.TodoModel.findOneAndUpdate(
      { title: 'A faire' },
      {
        $push: {
          tasks: data,
        },
      },
      { new: true },
    );

    if (!todo) {
      throw new Error('Todo non trouvé');
    }

    await this.mailservice.sendEmail({
      to: createTodoDto.info.mail,
      username: createTodoDto.info.user,
      title: createTodoDto.info.task,
    }, 'task-created');
  }

  // findOne(id: string): Todo | undefined {
  //   return this.todos.find((todo) => todo.id === Number(id));
  // }

  create(newTodo: any) {
    console.log(newTodo);

    return this.todos[0].tasks.push(newTodo?.task);
    // localStorage.setItem('tasks', JSON.stringify(this.tables));
    // this.todos = [...this.todos, newTodo];
  }

  async update(todo: any) {
    const updatetodo = await this.delete(todo.last, todo.task.name).then(() => {
      return this.TodoModel.findOneAndUpdate(
        { title: todo.next },
        {
          $push: {
            tasks: {
              name: todo.task.name,
              date: todo.task.date,
              update: new Date(),
              user: todo.task.user,
            },
          },
        },
      );
    });

    await this.mailservice.sendEmail({
      to: todo.mail,
      username: todo.user,
      title: todo.task.name,
      last: todo.last,
      next: todo.next,
    }, 'task-update');

    // this.getOne(todo.next).then(()=>{
    //     return this.TodoModel.findOneAndUpdate({title: todo.title}, {$push: {tasks: {name: todo.task.name, update: new Date()}}})
    // })
  }

  delete(title: string, taskName: string) {
    return this.TodoModel.findOneAndUpdate(
      { title: title },
      { $pull: { tasks: { name: taskName } } },
      { new: true },
    );
  }
}
