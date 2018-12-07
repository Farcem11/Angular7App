import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-active-users',
  templateUrl: './active-users.component.html',
  styleUrls: ['./active-users.component.css']
})
export class ActiveUsersComponent {

  constructor(private userService : UserService) {
    this.users = this.userService.activeUsers;
  }

  users: string[];

  onSetToInactive(id: number) {
    this.userService.setToInactive(id);
  }
}
