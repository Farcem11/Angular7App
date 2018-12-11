import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  token: string = '';

  constructor(private router: Router) { }

  signupUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .catch(error => {
      console.log(error);      
    })
  };

  async signinUser(email: string, password: string) {
    try {
      const response = await firebase.auth().signInWithEmailAndPassword(email, password);
      console.log(response);
      
      const currentUser = firebase.auth().currentUser;
      if(currentUser !== null) {
        this.token = await currentUser.getIdToken();
        this.router.navigate(['/']);
      }
    }
    catch(error) {
      console.log(error);      
    }
  };

  async logOut() {
    try {
      await firebase.auth().signOut();
      this.token = '';
      this.router.navigate([ '/']);
    }
    catch(error) {
      console.log(error);      
    }
  }

  isAuthenticated() {
    return this.token !== '';
  }
}
