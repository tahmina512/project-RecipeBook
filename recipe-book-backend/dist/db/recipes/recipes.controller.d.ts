import { RecipeService } from './recipes.service';
import { Ingredient } from './ingredients/ingredients.interface';
export declare class RecipeController {
    private readonly recipeService;
    constructor(recipeService: RecipeService);
    addRecipe(recipes: any[]): Promise<void>;
    getAllRecipes(): Promise<{
        name: string;
        imagePath: string;
        description: string;
        ingredients: Ingredient[];
    }[]>;
    deleteRecipeItem(item: any): Promise<void>;
    updateRecipeItem(updateData: any): Promise<void>;
}
