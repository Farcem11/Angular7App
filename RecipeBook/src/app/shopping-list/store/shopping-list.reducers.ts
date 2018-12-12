import { Ingredient } from 'src/app/models/ingredient.model';
import { ActionTypes } from 'src/app/shared/actionTypes';
import { ShoppingListActions } from './shopping-list.action';

export interface State {
    ingredients: Ingredient[];
    ingredientEdit: Ingredient,
    ingredientEditIndex: number
}

const initialState: State = {
    ingredients: [
        new Ingredient("Apple", 5),
        new Ingredient("Cinnamon", 7)
    ],
    ingredientEdit: null,
    ingredientEditIndex: -1
}

export function shoppingListReducer(state = initialState, action: ShoppingListActions) {
    switch(action.type) {
        case ActionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.data]
            };
        case ActionTypes.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.data]
            };
        case ActionTypes.DELETE_INGREDIENT:

            var ingredients = [...state.ingredients];
            ingredients.splice(action.data, 1);

            return {
                ...state,
                ingredients
            };
        case ActionTypes.UPDATE_INGREDIENT:
            
            var ingredients = [...state.ingredients];
            ingredients[state.ingredientEditIndex] = action.data;

            return {
                ...state,
                ingredients,
                ingredientEdit: null,
                ingredientEditIndex: -1
            };
        case ActionTypes.START_EDIT:
            return {
                ...state,
                ingredientEdit: state.ingredients[action.data],
                ingredientEditIndex: action.data
            };
        case ActionTypes.STOP_EDIT:
            return {
                ...state,
                ingredientEdit: null,
                ingredientEditIndex: -1
            };
        default:
            return state;
    }
}