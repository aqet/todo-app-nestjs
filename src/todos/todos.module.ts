import { Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Todo, TodoSchema } from './schemas/Todo.schemas';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [TodosController],
  providers: [TodosService],
  imports: [
    AuthModule,
    MongooseModule.forFeature([{
      name: Todo.name,
      schema: TodoSchema
    }])
  ]
})
export class TodosModule {}
