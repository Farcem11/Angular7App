import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-inactive-users',
  templateUrl: './inactive-users.component.html',
  styleUrls: ['./inactive-users.component.css']
})
export class InactiveUsersComponent {

  constructor(private userService : UserService) {
    this.users = this.userService.inactiveUsers;
  }

  users: string[];

  onSetToActive(id: number) {
    this.userService.setToActive(id);
  }
}
