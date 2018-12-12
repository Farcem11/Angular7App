import { Component, OnInit } from "@angular/core";
import { StoreDataService } from "src/app/services/store-data.service";
import { Store } from "@ngrx/store";
import * as fromApp from "src/app/store/app.reducers";
import { Observable } from "rxjs";
import * as fromAuth from "src/app/auth/store/auth.reducers";
import * as firebase from "firebase";
import * as AuthActions from '../../auth/store/auth.actions';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.sass']
})

export class HeaderComponent implements OnInit {

    authState: Observable<fromAuth.State>;

    constructor(private storeDataService: StoreDataService,
                private store: Store<fromApp.AppState>) {}

    ngOnInit() {
        this.authState = this.store.select('auth');
    }

    saveData() {
        this.storeDataService.saveRecipes();
    }

    fetchData() {
        this.storeDataService.loadRecipes();
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