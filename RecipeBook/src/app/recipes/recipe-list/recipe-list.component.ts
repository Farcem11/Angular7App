import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRecipes from '../store/recipes.reducers';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.sass']
})
export class RecipeListComponent implements OnInit {
  
  recipes : Observable<Recipe[]>;

  constructor(private store: Store<fromRecipes.State>) {}

  ngOnInit() {
    this.recipes = this.store.select('recipes');
  }
}
