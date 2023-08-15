import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Ingredient } from './ingredients/ingredients.interface';

@Schema()
export class Recipe extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  imagePath: string;
  @Prop({ required: true })
  description: string;

  @Prop([
    {
      name: { type: String },
      quantity: { type: Number },
    },
  ])
  ingredients: Ingredient[];
}

export const RecipeSchema = SchemaFactory.createForClass(Recipe);
