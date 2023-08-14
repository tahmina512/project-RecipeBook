import * as mongoose from 'mongoose';
import { Ingredient } from './ingredients/ingredients.interface';

export const RecipeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  imagePath: { type: String, required: true },
  ingredients: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
    },
  ],
});

export interface Recipe {
  name: string;
  desc: string;
  imagePath: string;
  ingredients: Ingredient[]; // Use the Ingredient interface here
}
