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
    // console.log('name', description, imagePath, ingredients);
    // const userId = Math.random().toString();
    const recipeExist = await this.recipeModel.findOne({
      name: name,
    });
    // console.log('object', recipeExist);
    if (!recipeExist) {
      // const formattedIngredients = ingredients.map((ingredient) => ({
      //   name: ingredient.name,
      //   amount: ingredient.amount,
      // }));
      const newRecipe = new this.recipeModel({
        name,
        imagePath,
        description,
        // ingredients: formattedIngredients,
        ingredients: ingredients,
      });
      console.log('newRecipe', newRecipe);
      const result = await newRecipe.save();
      // return prodId;
      // console.log(result);
      // return newRecipe;
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
  // async getSingleRecipe(recipeId:string): Promise<Recipe> {
  //   try {
  //     const objectId = new mongoose.Types.ObjectId(recipeId); // Convert to ObjectId
  //     console.log(objectId);
  //     const existingRecipe = await this.recipeModel.findById(objectId).exec();

  //     if (!existingRecipe) {
  //       throw new NotFoundException(`Recipe with ID ${recipeId} not found`);
  //     }

  //     return existingRecipe;
  //   } catch (error) {
  //     throw new InternalServerErrorException(
  //       'An error occurred while fetching the recipe',
  //     );
  //   }
  // }
  // async getRecipeById(id: string) {
  //   console.log('sdsdsd');
  //   const SingleRecipe = await this.recipeModel.findById(id).exec();
  //   // console.log(SingleRecipe.name);
  //   if (!SingleRecipe) {
  //     // console.log('object');
  //     throw new NotFoundException(`Recipe with ID ${id} not found`);
  //   }

  //   return SingleRecipe;
  // }

  // async updateRecipe(
  //   id: string,
  //   name: string,
  //   desc: string,
  //   imagePath: string,
  //   ingredients: Ingredient[],
  // ) {
  //   const recipeExist = await this.recipeModel.findById(id).exec();

  //   if (!recipeExist) {
  //     throw new NotFoundException(`Recipe with ID ${id} not found`);
  //   } else {
  //     if (name) {
  //       recipeExist.name = name;
  //     }
  //      if (imagePath) {
  //        recipeExist.imagePath = imagePath;
  //      }
  //     if (desc) {
  //       recipeExist.desc = desc;
  //     }

  //     if (ingredients) {
  //       recipeExist.ingredients = ingredients;
  //     }
  //   }

  //   await recipeExist.save();
  // }

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
    // Handle successful deletion here
  }
  catch(error) {
    console.error('Error deleting recipe:', error);
    // Handle the error (log, respond, etc.)
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
