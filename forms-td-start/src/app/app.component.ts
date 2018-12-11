import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('form') form : NgForm;
  defaultOption: string = "pet";
  answer: string = '';
  genders = ['male', 'female'];
  submitted = false;

  @ViewChild('formSignUp') formSignUp : NgForm;

  user: {
    UserName: '',
    Email: '',
    SecretQuestion: '',
    Answer: '',
    Gender: ''
  }

  suggestUserName() {
    const suggestedName = 'Superuser';

    this.form.form.patchValue({
      userData: {
        userName: suggestedName
      }
    });
  }

  onSubmit() {
    this.submitted = true;
    this.user = {
      UserName: this.form.value.userData.userName,
      Email: this.form.value.userData.email,
      SecretQuestion: this.form.value.secret,
      Answer: this.form.value.answer,
      Gender: this.form.value.gender
    }
    this.form.reset();
  }

  ngSignSubmit() {
    console.log(this.formSignUp.value);
  }
 }
