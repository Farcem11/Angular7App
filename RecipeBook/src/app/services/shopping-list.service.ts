import { Injectable } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  constructor() { }

  onIngredientChanges = new Subject<Ingredient[]>();
  startingEditing = new Subject<number>();

  private ingredients : Ingredient[] = [
    new Ingredient("Apple", 5),
    new Ingredient("Cinnamon", 7)
  ];

  addIngredient(ingredient : Ingredient) {
    this.ingredients.push(ingredient);
    this.onIngredientChanges.next(this.ingredients.slice());
  }

  addIngredients(ingredients : Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.onIngredientChanges.next(this.ingredients.slice());
  }

  getIngredients() : Ingredient[] {
    return this.ingredients.slice();
  }

  getIngredient(ingredientId: number) : Ingredient {
    return this.ingredients.slice()[ingredientId];
  }

  editIngredient(name: string, amount: number, index: number) {
    this.ingredients[index].name = name;
    this.ingredients[index].amount = amount;
  }

  deleteIngredient(ingredientIndex: number) {
    this.ingredients.splice(ingredientIndex, 1);
    this.onIngredientChanges.next(this.ingredients.slice());
  }
}
