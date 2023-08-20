import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';

import { Ingredient } from './ingredients/ingredients.interface';
import { Recipe } from './recipes.schema';
@Injectable()
export class RecipeService {
  constructor(
    @InjectModel('Recipe') private readonly recipeModel: Model<Recipe>,
  ) {}

  async addRecipeInfo(
    name: string,
    description: string,
    imagePath: string,
    ingredients: Ingredient[],
  ) {
 
    const recipeExist = await this.recipeModel.findOne({
      name: name,
    });
   
    if (!recipeExist) {
     
      const newRecipe = new this.recipeModel({
        name,
        imagePath,
        description,
        // ingredients: formattedIngredients,
        ingredients: ingredients,
      });
      console.log('newRecipe', newRecipe);
      const result = await newRecipe.save();
     
    }
  }
  async getRecipe() {
    const recipes = await this.recipeModel.find().exec();
    // console.log(recipes);
    return recipes.map((recipe) => ({
      name: recipe.name,
      imagePath: recipe.imagePath,
      description: recipe.description,
      ingredients: recipe.ingredients,
    }));
  }

  async deleteRecipe(item: Recipe) {
    console.log('item', item);
    const deletedRecipeItem = await this.recipeModel
      .findOneAndDelete({
        name: item.name,
        imagePath: item.imagePath,
        description: item.description,
        ingredients: item.ingredients,
      })
      .exec();
   
  }
  catch(error) {
    console.error('Error deleting recipe:', error);
    
  }

  async updateRecipe(prevRecipe: Recipe, updatedRecipe: Recipe) {
    console.log('prev0', prevRecipe, updatedRecipe);
    const findItem = await this.recipeModel
      .findOne({
        name: prevRecipe.name,
      })
      .exec();
    console.log('findItem', findItem.ingredients);
    if (findItem) {
      console.log('objfsdfdsfdfect', findItem);
      if (findItem.name) {
        findItem.name = updatedRecipe.name;
      }
      if (findItem.name) {
        findItem.name = updatedRecipe.name;
      }
      if (findItem.imagePath) {
        findItem.imagePath = updatedRecipe.imagePath;
      }
      if (findItem.description) {
        findItem.description = updatedRecipe.description;
      }
      if (findItem.ingredients) {
        findItem.ingredients = updatedRecipe.ingredients;
      }
    }
    console.log('newFInd', findItem);
    const updatedItem = await findItem.save();
    return updatedItem;
  }
}
