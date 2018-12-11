import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';
import { ShoppingListService } from '../services/shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.sass']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients : Ingredient[] = [];
  onIngredientAddedSubscription: Subscription;

  constructor(private shoppingListService : ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.onIngredientAddedSubscription = this.shoppingListService.onIngredientChanges.subscribe((ingredients : Ingredient[]) => {
      this.ingredients = ingredients;
    })
  }

  onEditIngredient(ingredientIndex: number) {
    this.shoppingListService.startingEditing.next(ingredientIndex);
  }

  deleteIngredient(event: Event, ingredientIndex: number) {
    this.shoppingListService.deleteIngredient(ingredientIndex);
    event.stopPropagation();
  }

  ngOnDestroy() {
    this.onIngredientAddedSubscription.unsubscribe();
  }
}
