import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from './store/shopping-list.action';
import * as fromShoppingList from './store/shopping-list.reducers';
import * as fromApp from '../store/app.reducers';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.sass']
})
export class ShoppingListComponent implements OnInit {

  shoppingListState : Observable<fromShoppingList.State>;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.shoppingListState = this.store.select('shoppingList');
  }

  onEditIngredient(ingredientIndex: number) {
    this.store.dispatch(new ShoppingListActions.StartEdit(ingredientIndex));
  }

  deleteIngredient(event: Event, ingredientIndex: number) {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient(ingredientIndex));
    event.stopPropagation();
  }
}
