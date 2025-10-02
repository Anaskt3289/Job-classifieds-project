import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document} from 'mongoose'

export type UserDocument = User & Document ;
@Schema()
export class User {
  @Prop()
  fullname: string;

  @Prop()
  email: string;

  @Prop()
  password:string

  @Prop()
  mobile_no:string

  @Prop({ default: Date.now })
  created_on?: Date;

  @Prop({ default: Date.now })
  updated_on?: Date;

  @Prop({ default: false })
  is_deleted?: boolean;

  @Prop()
  otp?:string

  @Prop()
  otp_last_updated_on?:Date
}

export const UserSchema = SchemaFactory.createForClass(User)