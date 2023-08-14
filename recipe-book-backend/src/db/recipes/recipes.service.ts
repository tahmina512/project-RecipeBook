import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Recipe } from './recipes.model';
import { Ingredient } from './ingredients/ingredients.interface';

@Injectable()
export class RecipeService {
  constructor(
    @InjectModel('Recipe') private readonly recipeModel: Model<Recipe>,
  ) {}

  async addRecipeInfo(
    name: string,
    desc: string,
    imagePath: string,
    ingredients: Ingredient[],
  ) {
    // const userId = Math.random().toString();
    const newRecipe = new this.recipeModel({
      name,
      desc,
      imagePath,
      ingredients: ingredients,
    });
    const result = await newRecipe.save();
    // return prodId;
    console.log(result);
    return newRecipe;
  }
}
