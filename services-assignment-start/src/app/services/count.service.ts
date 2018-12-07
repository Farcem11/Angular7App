import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountService {

  constructor() { 
    this.numberOfActions.active = 0;
    this.numberOfActions.inactive = 0;
  }

  numberOfActions : {active : number, inactive : number} = <{active : number, inactive : number}>{};
  

  increaseActiveAction() {
    this.numberOfActions.active++;
  }

    increaseInactiveAction() {
    this.numberOfActions.inactive++;
  }
}
