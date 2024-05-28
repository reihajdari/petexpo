/* eslint-disable prettier/prettier */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum Category {
  DOG = 'Dog',
  CAT = 'Cat',
  BIRD = 'Bird',
}

@Schema({
  timestamps: true,
})
export class Pet {
  @Prop()
  name: string;

  @Prop()
  breed_group: string;

  @Prop()
  size: string;

  @Prop()
  lifespan: string;

  @Prop()
  origin: string;

  @Prop()
  temperament: string;

  @Prop()
  description: string;

  @Prop()
  category: Category;

  @Prop()
  image: string;

  @Prop([String])
  colors: string[];
}

export const PetSchema = SchemaFactory.createForClass(Pet);
