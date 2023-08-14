import { Controller, Post, Body } from '@nestjs/common';
import { RecipeService } from './recipes.service';
import { Ingredient } from './ingredients/ingredients.interface';

@Controller('recipe')
export class RecipeController {
  //to add a new product
  constructor(private readonly recipeService: RecipeService) {}
  @Post()
  addRecipe(
    @Body('name') name: string,
    @Body('desc') desc: string,
    @Body('img') img: string,
    @Body('ingredients') ingredients: Ingredient[],
  ): any {
    const generatedRecipe = this.recipeService.addRecipeInfo(
      name,
      desc,
      img,
      ingredients,
    );
    console.log(generatedRecipe);
    return { generatedRecipe };
  }
}
