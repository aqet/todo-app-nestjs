import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodosModule } from './todos/todos.module';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [TodosModule, AuthModule, MongooseModule.forRoot('mongodb+srv://tientcheuigorcarel_db_user:YN7LNCRCvOfe6vHd@cluster0.wy05bqi.mongodb.net/')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
