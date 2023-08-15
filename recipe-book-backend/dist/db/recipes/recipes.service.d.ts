import mongoose, { Model } from 'mongoose';
import { Ingredient } from './ingredients/ingredients.interface';
import { Recipe } from './recipes.schema';
export declare class RecipeService {
    private readonly recipeModel;
    constructor(recipeModel: Model<Recipe>);
    addRecipeInfo(name: string, description: string, imagePath: string, ingredients: Ingredient[]): Promise<mongoose.Document<unknown, {}, Recipe> & Recipe & {
        _id: mongoose.Types.ObjectId;
    }>;
    getRecipe(): Promise<{
        name: string;
        imagePath: string;
        description: string;
        ingredients: Ingredient[];
    }[]>;
}
