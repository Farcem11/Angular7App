import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from 'src/app/services/recipe.service';

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
              private recipeService: RecipeService,
              private router: Router) { }

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
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      imagePath = recipe.imagePath;
      description = recipe.description;
      recipe.ingredients.forEach(ingredient => {
        this.addIngredientFormGroup(recipeIngredients, ingredient.name, ingredient.amount);
      })
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
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    else {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
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
