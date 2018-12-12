import { Action } from '@ngrx/store';
import { ActionTypes } from 'src/app/shared/actionTypes';

export class SignUp implements Action {
    readonly type = ActionTypes.SIGNUP;

    constructor(public data: string) {}
}

export class SignIn implements Action {
    readonly type = ActionTypes.SIGNIN;

    constructor(public data: string) {}
}

export class Logout implements Action {
    readonly type = ActionTypes.LOGOUT;
}

export class TrySignUp implements Action {
    readonly type = ActionTypes.TRY_SIGNUP;

    constructor(public data: {email: string, password: string}) {}
}

export class TrySignIn implements Action {
    readonly type = ActionTypes.TRY_SIGNIN;

    constructor(public data: {email: string, password: string}) {}
}

export type AuthActions = 
SignUp | 
SignIn | 
Logout |
TrySignUp;