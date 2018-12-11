import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../../models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.sass']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  
  recipes : Recipe[] = [];
  recipeChangesSubscription: Subscription;

  constructor(private recipeService : RecipeService) {}

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
    this.recipeChangesSubscription = this.recipeService.onRecipesChanges.subscribe((recipes: Recipe[])=> {
      this.recipes = recipes;
    })
  }

  ngOnDestroy() {
    this.recipeChangesSubscription.unsubscribe();
  }
}
