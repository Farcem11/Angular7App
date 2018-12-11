import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  form: FormGroup;
  forbiddenProjectNames = ['Test'];

  ngOnInit(): void {
    this.form = new FormGroup({
      projectName: new FormControl(null, Validators.required, this.forbiddenProjectNamesValidatiorAsync.bind(this)),
      email: new FormControl(null, [Validators.required, Validators.email]),
      projectStatus: new FormControl(null)
    });
  }

  onSubmit() {
    console.log(this.form.value);
  }

  forbiddenProjectNamesValidatior(control: FormControl) : {[s : string] : boolean} {
    if(this.forbiddenProjectNames.includes(control.value)) {
      return { 'forbiddenProjectName' : true };
    }
    else {
      return null;
    }
  }

  forbiddenProjectNamesValidatiorAsync(control: FormControl) : Promise<any> | Observable<any> {
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.forbiddenProjectNamesValidatior(control));
      }, 1000);      
    })
  }
}
