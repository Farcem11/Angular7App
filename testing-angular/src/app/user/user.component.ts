import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.sass']
})
export class UserComponent implements OnInit {
  user: {name: string};
  loggedIn: boolean = false;
  data: string;

  constructor(private userService: UserService,
              private dataService: DataService) { }

  ngOnInit() {
    this.user = this.userService.user;
    this.dataService.getDetails().then((data: string) => {
      this.data = data;
    })
  }

  login() {
    this.loggedIn = true;
  }

  logout() {
    this.loggedIn = false;
  }
}
