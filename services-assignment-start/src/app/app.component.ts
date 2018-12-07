import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { CountService } from './services/count.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 
  inactiveUsers = [];
  activeUsers = [];

  numberOfActions : {active : number, inactive : number} = <{active : number, inactive : number}>{};
  
  constructor(private userService : UserService, private countService : CountService) {
    this.inactiveUsers = this.userService.inactiveUsers;
    this.activeUsers = this.userService.activeUsers;

    this.numberOfActions = this.countService.numberOfActions;
  }
}
