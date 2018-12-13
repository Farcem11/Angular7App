import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import { ActionTypes } from "src/app/shared/actionTypes";
import { switchMap, map, tap, withLatestFrom } from "rxjs/operators";
import * as RecipesActions from "./recipes.actions";
import { HttpClient, HttpRequest } from "@angular/common/http";
import { Recipe } from "src/app/models/recipe.model";
import { Store } from "@ngrx/store";
import * as fromRecipes from '../store/recipes.reducers';

@Injectable()
export class RecipesEffects {
    private url : string = 'https://ng-recipe-book-ee833.firebaseio.com/';
	private recipesPath : string = 'recipes.json';
    
    constructor(private actions: Actions, 
                private httpClient: HttpClient,
                private store: Store<fromRecipes.FeatureState>) {}

    @Effect()
    recipesFetch = this.actions
    .ofType(ActionTypes.FETCH_RECIPES)
    .pipe(
        switchMap((action: RecipesActions.RecipesActions) => {
            return this.httpClient.get<Recipe[]>(this.url + this.recipesPath, {
                observe: 'body',
                responseType: 'json'
            })
        }),
        map((recipes) => {
            recipes.forEach((recipe: Recipe) => {
                if(recipe.ingredients === undefined) {
                    recipe.ingredients = [];
                }
            });
            return {
                type: ActionTypes.SET_RECIPES,
                data: recipes
            };
        })
    );

    @Effect({dispatch: false})
    recipesStore = this.actions
    .ofType(ActionTypes.STORE_RECIPES)
    .pipe(
        withLatestFrom(this.store.select('recipes')),
        switchMap(([action, state]) => {
            const request = new HttpRequest(
                'PUT', 
                this.url + this.recipesPath, 
                state.recipes, 
                {reportProgress: true});
            
            return this.httpClient.request(request);        
        })
    );
}