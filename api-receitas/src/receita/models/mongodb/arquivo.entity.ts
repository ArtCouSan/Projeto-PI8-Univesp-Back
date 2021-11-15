import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ArquivoDocument = Arquivo & Document;

@Schema()
export class Arquivo {

  @Prop()
  _id: string;

  @Prop()
  file: string;

  @Prop()
  name: string;
}

export const ArquivoSchema = SchemaFactory.createForClass(Arquivo);