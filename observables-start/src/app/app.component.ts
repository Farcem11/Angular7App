import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from './services/users.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  id: number;
  userActivatedSubscription: Subscription;

  constructor(private usersService: UsersService) {}

  ngOnInit() {
    this.userActivatedSubscription = this.usersService.userActivated.subscribe((id: number) => {
      this.id = id;
    })
  }

  ngOnDestroy() {
    this.userActivatedSubscription.unsubscribe();
  }
}
