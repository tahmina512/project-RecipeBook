"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let RecipeService = exports.RecipeService = class RecipeService {
    constructor(recipeModel) {
        this.recipeModel = recipeModel;
    }
    async addRecipeInfo(name, description, imagePath, ingredients) {
        const recipeExist = await this.recipeModel.findOne({
            name: name,
        });
        if (!recipeExist) {
            const newRecipe = new this.recipeModel({
                name,
                imagePath,
                description,
                ingredients: ingredients,
            });
            console.log('newRecipe', newRecipe);
            const result = await newRecipe.save();
        }
    }
    async getRecipe() {
        const recipes = await this.recipeModel.find().exec();
        return recipes.map((recipe) => ({
            name: recipe.name,
            imagePath: recipe.imagePath,
            description: recipe.description,
            ingredients: recipe.ingredients,
        }));
    }
    async deleteRecipe(item) {
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
    async updateRecipe(prevRecipe, updatedRecipe) {
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
};
exports.RecipeService = RecipeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Recipe')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], RecipeService);
//# sourceMappingURL=recipes.service.js.map