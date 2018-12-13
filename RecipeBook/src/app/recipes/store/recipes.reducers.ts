import { ActionTypes } from "src/app/shared/actionTypes";
import { Recipe } from "src/app/models/recipe.model";
import { Ingredient } from "src/app/models/ingredient.model";
import { RecipesActions } from "./recipes.actions";
import * as fromApp from '../../store/app.reducers';

export interface FeatureState extends fromApp.AppState {
    recipes: State
}

export interface State {
    recipes: Recipe[]
}

const initialState: State = {
    recipes : [
        new Recipe(
            "Pizza", 
            "Supreme", 
            "https://upload.wikimedia.org/wikipedia/commons/a/a3/Eq_it-na_pizza-margherita_sep2005_sml.jpg",
            [
                new Ingredient('Tomato', 5),
                new Ingredient('Cheese', 7),
                new Ingredient('Bread', 1),
                new Ingredient('Ham', 4),
            ]),
        new Recipe(
            "Pasta", 
            "Pomodoro", 
            "https://img1.southernliving.timeinc.net/sites/default/files/styles/story_card_hero/public/image/2016/01/main/all-one-spaghetti-x_0_0.jpg",
            [
                new Ingredient('Pasta', 10),
                new Ingredient('Tomato', 8),
                new Ingredient('Cheese', 1),
                new Ingredient('Meat', 3),
            ])
    ]
}

export function recipesReducer(state = initialState, action : RecipesActions) {
    switch(action.type) {
        case ActionTypes.SET_RECIPES:
            return {
                ...state,
                recipes: action.data
            }
        case ActionTypes.ADD_RECIPE:
            return {
                ...state,
                recipes: [...state.recipes, action.data]
            }
        case ActionTypes.UPDATE_RECIPE:
            var recipes = [...state.recipes];
            recipes[action.data.index] = action.data.recipe;
            
            return {
                ...state,
                recipes
            }
        case ActionTypes.DELETE_RECIPE:
            var recipes = [...state.recipes];
            recipes.splice(action.data, 1);
            
            return {
                ...state,
                recipes
            }
        default:
            return state;
    }
}