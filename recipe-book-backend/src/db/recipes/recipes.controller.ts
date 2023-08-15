import {
  Controller,
  Post,
  Body,
  Get,
  Res,
  Param,
  HttpStatus,
  Put,
  Delete,
} from '@nestjs/common';
import { RecipeService } from './recipes.service';
import { Ingredient } from './ingredients/ingredients.interface';

@Controller('recipes')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}
  @Post()

  addRecipe(@Body() recipes: any[]) {
  
    console.log(recipes.length);
    for (let i = 0; i < recipes.length; i++) {
      console.log('Hello1sasas', recipes[i].name);
      const name = recipes[i].name;
      const imagePath = recipes[i].imagePath;
      const desc = recipes[i].description;
      const ingredients = recipes[i].ingredients;
      const generatedRecipe = this.recipeService.addRecipeInfo(
        name,
        desc,
        imagePath,

        ingredients,
      );
    }
  }

  @Get()
  async getAllRecipes() {
    const recipes = await this.recipeService.getRecipe();

    console.log(recipes);
    return recipes;
  }
  // @Get(':id')
  // async getRecipeById(@Param('id') id: string, @Res() response) {
  //   // console.log(id);
  //   try {
  //     const recipe = await this.recipeService.getRecipeById(id);
  //     return response.status(200).json({ message: 'Recipe found', recipe });
  //   } catch (err) {
  //     return response.status(404).json({ message: `Recipe not found` });
  //   }
  // }
  // @Put(':id')
  // async updateRecipe(
  //   @Param('id') id: string,
  //   @Body('name') name: string,
  //   @Body('desc') desc: string,
  //   @Body('imagePath') imagePath: string,
  //   @Body('ingredients') ingredients: Ingredient[],
  // ) {
  //   await this.recipeService.updateRecipe(
  //     id,
  //     name,
  //     desc,
  //     imagePath,
  //     ingredients,
  //   );
  //   return { message: 'Recipe updated successfully' };
  // }
  // @Delete(':id')
  // async deleteRecipeItem(@Param('id') id: string) {
  //   this.recipeService.deleteRecipe(id);
  //   return { message: 'Recipe deleted successfully' };
  // }
}
