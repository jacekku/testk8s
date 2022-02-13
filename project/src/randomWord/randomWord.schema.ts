import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RandomWordDocument = RandomWord & Document;

@Schema()
export class RandomWord {
  @Prop()
  word: string;
  @Prop()
  def: string;
  @Prop()
  speech_part: string;
  @Prop()
  syn: string[][];
}

export const RandomWordSchema = SchemaFactory.createForClass(RandomWord);
