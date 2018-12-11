import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Ingredient } from 'src/app/models/ingredient.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.sass']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('ingredientForm') ingredientForm: NgForm;
  startingEditingSubscription : Subscription;
  editMode: boolean = false;
  editingIngredientIndex: number = 0;

  constructor(private shoppingListService : ShoppingListService) { }

  ngOnInit() {
    this.startingEditingSubscription = this.shoppingListService.startingEditing.subscribe((ingredientIndex: number) => {
      const ingredient = this.shoppingListService.getIngredient(ingredientIndex);
      this.editingIngredientIndex = ingredientIndex;
      this.editMode = true;

      this.ingredientForm.setValue({
        name: ingredient.name,
        amount: ingredient.amount
      })
    })
  }

  onSubmit() {
    if(!this.editMode) {
      this.shoppingListService.addIngredient(new Ingredient(this.ingredientForm.value.name, this.ingredientForm.value.amount));
      this.ingredientForm.reset();
    }
    else {
      this.shoppingListService.editIngredient(
        this.ingredientForm.value.name,
        this.ingredientForm.value.amount, 
        this.editingIngredientIndex);
      this.clearForm();
    }
  }

  clearForm() {
    this.editMode = false;
    this.ingredientForm.reset();
  }

  ngOnDestroy(): void {
    this.startingEditingSubscription.unsubscribe();
  }
}
