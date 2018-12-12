import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Ingredient } from 'src/app/models/ingredient.model';
import * as shoppingListActions from '../../shopping-list/store/shopping-list.action';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.sass']
})
export class RecipeDetailComponent implements OnInit {

  recipe : Recipe = <Recipe>{};
  id: number;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router,
              private store: Store<{shoppingList:{ingredients: Ingredient[]}}>) {}

  ngOnInit() {
    this.id = +this.route.snapshot.params['id'];
    this.recipe = this.recipeService.getRecipe(this.id);
    this.route.params.subscribe( (params : Params) => {
      this.id = +params['id'];
      this.recipe = this.recipeService.getRecipe(this.id);
    })
  }

  addIngredientsToShoppingList() {
    this.store.dispatch(new shoppingListActions.AddIngredients(this.recipe.ingredients));
  }

  deleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
