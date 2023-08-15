import { RecipeService } from './recipes.service';
import { Ingredient } from './ingredients/ingredients.interface';
export declare class RecipeController {
    private readonly recipeService;
    constructor(recipeService: RecipeService);
    addRecipe(recipes: any[]): void;
    getAllRecipes(): Promise<{
        name: string;
        imagePath: string;
        description: string;
        ingredients: Ingredient[];
    }[]>;
}
