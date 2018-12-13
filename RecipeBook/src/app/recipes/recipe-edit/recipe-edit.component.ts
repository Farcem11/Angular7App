import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromRecipes from '../store/recipes.reducers';
import * as RecipesActions from '../store/recipes.actions';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.sass']
})
export class RecipeEditComponent implements OnInit {

  recipeForm: FormGroup;

  id : number = 0;
  editMode = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromRecipes.FeatureState>) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.editMode = params['id'] !== undefined;
    });
    this.initForm();
  }

  initForm() {
    let recipeName = '';
    let imagePath = '';
    let description = '';
    let recipeIngredients = new FormArray([]);

    if(this.editMode) {
      this.store.select('recipes')
      .pipe(take(1))
      .subscribe((state: fromRecipes.State) => {
        const recipe = state.recipes[this.id];

        recipeName = recipe.name;
        imagePath = recipe.imagePath;
        description = recipe.description;
        recipe.ingredients.forEach(ingredient => {
          this.addIngredientFormGroup(recipeIngredients, ingredient.name, ingredient.amount);
        })
      }); 
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(imagePath, Validators.required),
      description: new FormControl(description, Validators.required),
      ingredients: recipeIngredients
    })
  }

  addIngredientFormGroup(formArray: FormArray, name: string, amount: number) {
    formArray.push(new FormGroup({
      name: new FormControl(name, Validators.required),
      amount: new FormControl(amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    }));
  }

  addIngredient() {
    this.addIngredientFormGroup(
      (<FormArray>this.recipeForm.get('ingredients')), '', 0);
  }

  getControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onSubmit() {
    if(!this.editMode) {
      this.store.dispatch(new RecipesActions.AddRecipe(this.recipeForm.value))
    }
    else {
      this.store.dispatch(new RecipesActions.UpdateRecipe({index: this.id, recipe: this.recipeForm.value}))
    }
    this.cancelFormRecipe();
  }

  cancelFormRecipe() {
    this.editMode = false;
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  deleteIngredient(ingredientIndex: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(ingredientIndex);
  }
}
