import { Injectable, EventEmitter } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  constructor() { }

  onIngredientAdded = new EventEmitter<Ingredient[]>();

  private ingredients : Ingredient[] = [
    new Ingredient("Apple", 5),
    new Ingredient("Cinnamon", 7)
  ];

  addIngredient(ingredient : Ingredient) {
    this.ingredients.push(ingredient);
    this.onIngredientAdded.emit(this.ingredients.slice());
  }

  addIngredients(ingredients : Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.onIngredientAdded.emit(this.ingredients.slice());
  }

  getIngredients() {
    return this.ingredients.slice();
  }
}
