import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromAuth from '../store/auth.reducers';
import * as AuthActions from '../store/auth.actions';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.sass']
})
export class SigninComponent implements OnInit {

  constructor(private store: Store<fromAuth.State>) { }

  ngOnInit() {
  }

  onSubmit(formSignUp: NgForm) {
    const email = formSignUp.value.email;    
    const password = formSignUp.value.password;    

    this.store.dispatch(new AuthActions.TrySignIn({email, password}));
  }
}
