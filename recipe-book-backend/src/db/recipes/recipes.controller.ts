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
import { Recipe } from './recipes.schema';
import { log } from 'console';

@Controller('recipes')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}
  @Post()
  async addRecipe(@Body() recipes: any[]) {
    //console.log('recipes', recipes);

    for (let i = 0; i < recipes.length; i++) {
      const name = recipes[i].name;
      const imagePath = recipes[i].imagePath;
      const desc = recipes[i].description;
      const ingredients = recipes[i].ingredients;

      console.log('ingredientsController', ingredients);
      const generatedRecipe = await this.recipeService.addRecipeInfo(
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

    // console.log(recipes);
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
  @Delete(':delete')
  async deleteRecipeItem(@Body() item: any) {
    const name = item.name;
    console.log(name);
    console.log('object', item);
    this.recipeService.deleteRecipe(item);
    // return { message: 'Recipe deleted successfully' };
  }
  // @Put(':id')
  // updateRecipe(
  //   @Param('id') recipeId: string,
  //   @Body() updatedRecipe: Recipe,
  // ): any {
  //   const result = this.recipeService.updateRecipe(recipeId, updatedRecipe);
  //   return { message: 'Recipe updated successfully' };
  // }
  @Put(':update')
  async updateRecipeItem(@Body() updateData: any) {
    console.log('hi');
    const prevItem = updateData.prevItem;
    const editedItem = updateData.editedItem;
    console.log('obj1', prevItem);
    console.log('obj2', editedItem);
    await this.recipeService.updateRecipe(prevItem, editedItem);
  }
}
