import { Component, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/models/ingredient.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.sass']
})
export class ShoppingEditComponent implements OnInit {

  name : string = '';
  amount : number = 0;

  constructor(private shoppingListService : ShoppingListService) { }

  ngOnInit() {
  }

  addIngredient() {
    this.shoppingListService.addIngredient(new Ingredient(this.name, this.amount));
    this.name = '';
    this.amount = 0;
  }
}
