import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { Ingredient } from '../models/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  onRecipesChanges: Subject<Recipe[]> = new Subject();

  constructor() { }

  private recipes : Recipe[] = [
    new Recipe(
      "Pizza", 
      "Supreme", 
      "https://upload.wikimedia.org/wikipedia/commons/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg",
      [
        new Ingredient('Tomato', 5),
        new Ingredient('Cheese', 7),
        new Ingredient('Bread', 1),
        new Ingredient('Ham', 4),
      ]),
    new Recipe(
      "Pasta", 
      "Pomodoro", 
      "https://img1.southernliving.timeinc.net/sites/default/files/styles/story_card_hero/public/image/2016/01/main/all-one-spaghetti-x_0_0.jpg",
      [
        new Ingredient('Pasta', 10),
        new Ingredient('Tomato', 8),
        new Ingredient('Cheese', 1),
        new Ingredient('Meat', 3),
      ])
  ];

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes.slice()[index];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.onRecipesChanges.next(this.recipes.slice());
  }

  updateRecipe(recipeIndex: number, recipe: Recipe) {
    this.recipes[recipeIndex] = recipe;
    this.onRecipesChanges.next(this.recipes.slice());
  }

  deleteRecipe(recipeIndex: number) {
    this.recipes.splice(recipeIndex, 1);
    this.onRecipesChanges.next(this.recipes.slice());
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.onRecipesChanges.next(this.recipes.slice());
  }
}