import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/models/ingredient.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.action';
import * as fromShoppingList from '../store/shopping-list.reducers';
import * as fromApp from '../../store/app.reducers';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.sass']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('ingredientForm') ingredientForm: NgForm;
  startingEditingSubscription : Subscription;
  editMode: boolean = false;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.startingEditingSubscription = this.store.select('shoppingList').subscribe((state: fromShoppingList.State) => {
      if(state.ingredientEdit !== null) {
        this.editMode = true;

        this.ingredientForm.setValue({
          name: state.ingredientEdit.name,
          amount: state.ingredientEdit.amount
        })
      }
    })
  }

  onSubmit() {
    if(!this.editMode) {
      const newIngredient = new Ingredient(this.ingredientForm.value.name, this.ingredientForm.value.amount);
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
      this.ingredientForm.reset();
    }
    else {
      const { name, amount } = this.ingredientForm.value;
      
      this.store.dispatch(new ShoppingListActions.UpdateIngredient(new Ingredient(name, amount)));
      this.clearForm();
    }
  }

  clearForm() {
    this.editMode = false;
    this.ingredientForm.reset();
  }

  ngOnDestroy(): void {
    this.startingEditingSubscription.unsubscribe();
    this.store.dispatch(new ShoppingListActions.StopEdit());
  }
}
