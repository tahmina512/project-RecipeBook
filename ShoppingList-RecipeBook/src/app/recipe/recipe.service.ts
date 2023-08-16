import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
// to inject one service to another use onjectable decorator
let item;
@Injectable()
export class RecipeService {
  //manage our recipes
  recipesChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Fruit custard',
  //     'Made with fresh fruits, milk',
  //     'https://www.vegrecipesofindia.com/wp-content/uploads/2021/11/fruit-custard-4.jpg',
  //     [
  //       new Ingredient('mango', 10),
  //       new Ingredient('Orange', 5),
  //       new Ingredient('apple', 5),
  //     ]
  //   ),
  //   new Recipe(
  //     'Fruit Salad',
  //     'Made with seasonal fruits',
  //     'https://images.unsplash.com/photo-1564093497595-593b96d80180?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=435&q=80',
  //     [
  //       new Ingredient('apple', 5),
  //       new Ingredient('pomegranate', 1),
  //       new Ingredient('strawberry', 15),
  //     ]
  //   ),
  // ];
  private recipes: Recipe[] = [];
  constructor(
    private slService: ShoppingListService,
    private http: HttpClient
  ) {}
  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
  getRecipes() {
    return this.recipes.slice();
  }
  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToSHoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }
  updateRecipe(index: number, newRecipe: Recipe) {
    const prevItem = this.recipes[index];
    this.recipes[index] = newRecipe;
    // Your first object data
    const editedItem = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
    const updateData = {
      prevItem,
      editedItem,
    };

    console.log(updateData);
    this.http
      .put('http://localhost:3000/recipes/update', updateData)
      .subscribe((response) => {
        console.log(response); // Handle the response from the backend
      });
    //console.log(newRecipe);
  }
  deleteRecipe(index: number) {
    item = this.recipes[index];
    console.log(item);
    // Remove the recipe from the frontend array
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
    // console.log('item', item);
    this.http
      .delete('http://localhost:3000/recipes/delete', { body: item })
      .subscribe((response) => {
        console.log(response);
      });
  }
}
