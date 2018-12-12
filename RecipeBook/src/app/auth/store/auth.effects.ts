import { Effect, Actions } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { ActionTypes } from 'src/app/shared/actionTypes';
import { map, switchMap, mergeMap, tap } from 'rxjs/operators';
import * as AuthActions  from './auth.actions';
import * as firebase from 'firebase';
import { from } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
    
    constructor(private actions: Actions, 
                private router: Router) {}

    @Effect()
    authSignUp = this.actions
    .ofType(ActionTypes.TRY_SIGNUP)
    .pipe(
        map((action: AuthActions.TrySignUp) => {
            return action.data
        }),
        switchMap((authData: {email: string, password: string}) => {
            return from(firebase.auth().createUserWithEmailAndPassword(authData.email, authData.password));
        }),
        switchMap(() => {
            return from(firebase.auth().currentUser.getIdToken());
        }),
        mergeMap((token: string) => {
            return [
                {
                    type: ActionTypes.SIGNUP,
                    data: token
                }
            ]
        })
    );
    
    @Effect()
    authSignIn = this.actions
    .ofType(ActionTypes.TRY_SIGNIN)
    .pipe(
        map((action: AuthActions.TrySignIn) => {
            return action.data
        }),
        switchMap((authData: {email: string, password: string}) => {
            return from(firebase.auth().signInWithEmailAndPassword(authData.email, authData.password));
        }),
        switchMap(() => {
            return from(firebase.auth().currentUser.getIdToken());
        }),
        mergeMap((token: string) => {
            this.router.navigate(['/']);
            return [
                {
                    type: ActionTypes.SIGNIN,
                    data: token
                }
            ]
        })
    );

    @Effect({dispatch: false})
    authLogout = this.actions
    .ofType(ActionTypes.LOGOUT)
    .pipe(
        tap(() => {
            this.router.navigate(['/'])
        })
    )
}