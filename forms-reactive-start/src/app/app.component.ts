import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  form : FormGroup;
  forbiddenUserNames = ['Chris', 'Anna'];
  
  ngOnInit() {
    this.form = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        email: new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails),
      }),
      gender: new FormControl('male'),
      hobbies: new FormArray([])
    });

    // this.form.valueChanges.subscribe((value) => {
    //   console.log(value);      
    // })

    this.form.statusChanges.subscribe((status) => {
        console.log(status);      
    });
    this.form.setValue({
      userData : {
        username: 'Fabian',
        email: 'Fabian@gmail.com'
      },
      gender: 'male',
      hobbies: []
    });
    this.form.patchValue({
      userData : {
        username: 'Jose',
      }
    })
    this.form.reset();
  }

  onSubmit() {
    console.log(this.form);    
  }

  addHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.form.get('hobbies')).push(control);
  }

  forbiddenNames(control: FormControl): {[s: string]: boolean} {
    if(this.forbiddenUserNames.includes(control.value)) {
      return {'nameIsForbidden': true};
    }
    return null;
  }

  forbiddenEmails(control: FormControl) : Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if(control.value === 'test@test.com') {
          resolve({'emailIsForbidden': true});
        }
        else {
          resolve(null);
        }
      } ,1500);
    })
    return promise;
  }
}
