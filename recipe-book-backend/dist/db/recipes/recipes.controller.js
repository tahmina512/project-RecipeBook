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
exports.RecipeController = void 0;
const common_1 = require("@nestjs/common");
const recipes_service_1 = require("./recipes.service");
let RecipeController = exports.RecipeController = class RecipeController {
    constructor(recipeService) {
        this.recipeService = recipeService;
    }
    async addRecipe(recipes) {
        for (let i = 0; i < recipes.length; i++) {
            const name = recipes[i].name;
            const imagePath = recipes[i].imagePath;
            const desc = recipes[i].description;
            const ingredients = recipes[i].ingredients;
            console.log('ingredientsController', ingredients);
            const generatedRecipe = await this.recipeService.addRecipeInfo(name, desc, imagePath, ingredients);
        }
    }
    async getAllRecipes() {
        const recipes = await this.recipeService.getRecipe();
        return recipes;
    }
    async deleteRecipeItem(item) {
        const name = item.name;
        console.log(name);
        console.log('object', item);
        this.recipeService.deleteRecipe(item);
    }
    async updateRecipeItem(updateData) {
        console.log('hi');
        const prevItem = updateData.prevItem;
        const editedItem = updateData.editedItem;
        console.log('obj1', prevItem);
        console.log('obj2', editedItem);
        await this.recipeService.updateRecipe(prevItem, editedItem);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "addRecipe", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "getAllRecipes", null);
__decorate([
    (0, common_1.Delete)(':delete'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "deleteRecipeItem", null);
__decorate([
    (0, common_1.Put)(':update'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RecipeController.prototype, "updateRecipeItem", null);
exports.RecipeController = RecipeController = __decorate([
    (0, common_1.Controller)('recipes'),
    __metadata("design:paramtypes", [recipes_service_1.RecipeService])
], RecipeController);
//# sourceMappingURL=recipes.controller.js.map