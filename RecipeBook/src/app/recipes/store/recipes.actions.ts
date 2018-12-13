import { Action } from '@ngrx/store';
import { ActionTypes } from 'src/app/shared/actionTypes';
import { Recipe } from 'src/app/models/recipe.model';

export class SetRecipes implements Action {
    readonly type = ActionTypes.SET_RECIPES;

    constructor(public data: Recipe[]) {}
}

export class AddRecipe implements Action {
    readonly type = ActionTypes.ADD_RECIPE;

    constructor(public data: Recipe) {}
}

export class UpdateRecipe implements Action {
    readonly type = ActionTypes.UPDATE_RECIPE;

    constructor(public data: {index: number, recipe: Recipe}) {}
}

export class DeleteRecipe implements Action {
    readonly type = ActionTypes.DELETE_RECIPE;

    constructor(public data: number) {}
}

export class StoreRecipes implements Action {
    readonly type = ActionTypes.STORE_RECIPES;
}

export class FetchRecipes implements Action {
    readonly type = ActionTypes.FETCH_RECIPES;
}

export type RecipesActions = SetRecipes |
AddRecipe |
UpdateRecipe |
DeleteRecipe |
StoreRecipes |
FetchRecipes;