import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/auth/schema/User.schemas';

@Schema({
  timestamps: true
    // createdAt: 'created_at', 
    // updatedAt: 'updated_at', 
  // },
})
export class Todo {
  @Prop({ required: true })
  title: string;

  @Prop({type: [{ name: 'string', date: Date, update: Date, user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}}], default: {name: '', date: null, user: {}}})
  tasks: {
    name: string
    date: Date
    update: Date,
    user: User
  }[];

  
}

export const TodoSchema = SchemaFactory.createForClass(Todo);
