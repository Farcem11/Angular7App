import { AuthActions } from "./auth.actions";
import { ActionTypes } from "src/app/shared/actionTypes";

export interface State {
    token: string,
    authenticated: boolean
}

const initialState: State = {
    token: null,
    authenticated: false    
}

export function authReducer(state = initialState, action : AuthActions) {
    switch(action.type) {
        case ActionTypes.SIGNUP:
        case ActionTypes.SIGNIN:
            return {
                ...state,
                authenticated: true,
                token: action.data
            };
        case ActionTypes.LOGOUT:
            return {
                ...state,
                authenticated: false,
                token: null
            };
        default:
            return state;
    }
}