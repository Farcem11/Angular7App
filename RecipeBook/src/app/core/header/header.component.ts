import { Component } from "@angular/core";
import { StoreDataService } from "src/app/services/store-data.service";
import { AuthService } from "src/app/services/auth.service";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.sass']
})

export class HeaderComponent {
    
    constructor(private storeDataService: StoreDataService,
                private authService: AuthService) {}

    saveData() {
        this.storeDataService.saveRecipes();
    }

    fetchData() {
        this.storeDataService.loadRecipes();
    }

    logOut() {
        this.authService.logOut();
    }

    isAuthenticated() {
        return this.authService.isAuthenticated();
    }
}