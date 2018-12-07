import { Component, OnInit } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';
import { ShoppingListService } from '../services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.sass']
})
export class ShoppingListComponent implements OnInit {
  
  constructor(private shoppingListService : ShoppingListService) { }

  ingredients : Ingredient[] = [];

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.shoppingListService.onIngredientAdded.subscribe((ingredients : Ingredient[]) => {
      this.ingredients = ingredients;
    })
  }
}
