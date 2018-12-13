import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as shoppingListActions from '../../shopping-list/store/shopping-list.action';
import * as fromRecipes from '../store/recipes.reducers';
import * as RecipesActions from '../store/recipes.actions';
import * as fromApp from '../../store/app.reducers';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.sass']
})
export class RecipeDetailComponent implements OnInit {

  recipeState : Observable<fromRecipes.State>;
  id: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.route.params.subscribe( (params : Params) => {
      this.id = +params['id'];
      this.recipeState = this.store.select('recipes');
    })
  }

  addIngredientsToShoppingList() {
    this.store.select('recipes')
    .pipe(take(1))
    .subscribe((state: fromRecipes.State) => {
      this.store.dispatch(new shoppingListActions.AddIngredients(state.recipes[this.id].ingredients));
    })
  }

  deleteRecipe() {
    this.store.dispatch(new RecipesActions.DeleteRecipe(this.id));
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
