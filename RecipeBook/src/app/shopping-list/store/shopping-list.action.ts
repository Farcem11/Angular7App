import { Action } from '@ngrx/store';
import { Ingredient } from 'src/app/models/ingredient.model';
import { ActionTypes } from 'src/app/shared/actionTypes';

export class AddIngredient implements Action {
    readonly type = ActionTypes.ADD_INGREDIENT; 
    
    constructor(public data: Ingredient) {}
}

export class AddIngredients implements Action {
    readonly type = ActionTypes.ADD_INGREDIENTS; 
    
    constructor(public data: Ingredient[]) {}
}

export class DeleteIngredient implements Action {
    readonly type = ActionTypes.DELETE_INGREDIENT; 
    
    constructor(public data: number) {}
}

export class UpdateIngredient implements Action {
    readonly type = ActionTypes.UPDATE_INGREDIENT; 
    
    constructor(public data: Ingredient) {}
}

export class StartEdit implements Action {
    readonly type = ActionTypes.START_EDIT; 
    
    constructor(public data: number) {}
}

export class StopEdit implements Action {
    readonly type = ActionTypes.STOP_EDIT; 
}

export type ShoppingListActions = 
AddIngredient | 
AddIngredients | 
DeleteIngredient | 
UpdateIngredient |
StartEdit |
StopEdit;
