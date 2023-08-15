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

  // async addRecipeInfo(
  //   name: string,
  //   desc: string,
  //   imagePath: string,
  //   ingredients: Ingredient[],
  // ) {
  //   // const userId = Math.random().toString();
  //   const newRecipe = new this.recipeModel({
  //     name,
  //     desc,
  //     imagePath,
  //     ingredients: ingredients,
  //   });
  //   const result = await newRecipe.save();
  //   // return prodId;
  //   console.log(result);
  //   return newRecipe;
  // }
  async addRecipeInfo(
    name: string,
    description: string,
    imagePath: string,
    ingredients: Ingredient[],
  ) {
    console.log(name, description, imagePath);
    // const userId = Math.random().toString();
    const newRecipe = new this.recipeModel({
      name,
      imagePath,
      description,
      ingredients: ingredients,
    });
    const result = await newRecipe.save();
    // return prodId;
    console.log(result);
    return newRecipe;
  }
  async getRecipe() {
    const recipes = await this.recipeModel.find().exec();
    console.log(recipes);
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

  // async deleteRecipe(id: string) {
  //   const deletedRecipe = await this.recipeModel.findByIdAndDelete(id).exec();

  //   if (!deletedRecipe) {
  //     throw new NotFoundException(`Recipe with ID ${id} not found`);
  //   }
  // }
}
