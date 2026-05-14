import { Body, Controller, Get, Param, Post, Patch, Delete, Put, UseGuards, Req } from '@nestjs/common';
import { Todo } from './interfaces/interface.todos';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('todos')
export class TodosController {
    constructor(private readonly todosService: TodosService) {}

    @Post('init')
    initTodo(@Body() initTodo: CreateTodoDto){
        console.log(initTodo);
        
        return this.todosService.initialisationTodo(initTodo);
    }

    @Get()
    @UseGuards(AuthGuard())
    findAll(){
        return this.todosService.getAllTodos();
    }

    // @Get(':id')
    // findById(@Param('id') id){
        
    //     return this.todosService.getTodosById(id);
    //     // return this.todosService.findOne(id)
    // }

    @Patch()
    @UseGuards(AuthGuard())
    createTodo(@Body() newTodo: any, @Req() req: any) {
        
        // return this.todosService.create(newTodo);
        return this.todosService.createTodo(newTodo, req.user);
    }

    @Put('update')
    @UseGuards(AuthGuard())
    update(@Body() todo: CreateTodoDto[]){
        return this.todosService.update(todo);
    }

    @Delete(":title/task/:taskId")
    @UseGuards(AuthGuard())
    delete(@Param('title') title, @Param('taskId') taskId){
        return this.todosService.delete(title, taskId);
    }
}
