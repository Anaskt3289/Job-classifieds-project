import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {Document} from 'mongoose'

export type JobDocument = Jobs & Document ;
@Schema()
export class Jobs {
  @Prop()
  company_name: string;

  @Prop()
  job_position: string;

  @Prop()
  description?:string

  @Prop()
  location:string

  @Prop()
  salary?:string

  @Prop()
  job_type?:string

  @Prop()
  experience_required?:string

  @Prop()
  skills?:string

  @Prop()
  contact_no:string

  @Prop()
  created_by:string

  @Prop({ default: Date.now })
  created_on?: Date;

  @Prop()
  updated_by?:string

  @Prop({ default: Date.now })
  updated_on?: Date;

  @Prop({ default: false })
  is_deleted?: boolean;
}

export const JobSchema = SchemaFactory.createForClass(Jobs)