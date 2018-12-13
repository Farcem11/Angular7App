import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromApp from "src/app/store/app.reducers";
import { Observable } from "rxjs";
import * as fromAuth from "../../auth/store/auth.reducers";
import * as AuthActions from '../../auth/store/auth.actions';
import * as RecipesActions from '../../recipes/store/recipes.actions';
import * as firebase from "firebase";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.sass']
})

export class HeaderComponent implements OnInit {

    authState: Observable<fromAuth.State>;

    constructor(private store: Store<fromApp.AppState>) {}

    ngOnInit() {
        this.authState = this.store.select('auth');
    }

    saveData() {
        this.store.dispatch(new RecipesActions.StoreRecipes());
    }

    fetchData() {
        this.store.dispatch(new RecipesActions.FetchRecipes());
    }

    async logOut() {
        try {
            const response = await firebase.auth().signOut();
            console.log(response);            
            this.store.dispatch(new AuthActions.Logout());
        }
        catch(error) {
          console.log(error);      
        }
    }
}