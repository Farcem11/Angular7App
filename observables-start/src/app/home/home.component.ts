import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Observer, Subscription, interval } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnDestroy {

  numbersSubscription: Subscription;
  customSubscription: Subscription;

  constructor() { }

  ngOnInit() {
    const numbers = interval(1000).pipe(map((number: number)=> {
      return number * 2;
    }));

    this.numbersSubscription = numbers.subscribe((number : number) => {
      console.log(number);      
    })

    const myObservable = Observable.create((observer: Observer<string>) => {
      setTimeout(()=> {
        observer.next('First');
      }, 2000);

      setTimeout(()=> {
        observer.next('Second');
      }, 4000);

      setTimeout(()=> {
        observer.error('Something went wrong!');
      }, 5000);
    })

    this.customSubscription = myObservable.subscribe(
    (text: string) => {
      console.log(text);
    },
    (error: string) => {
      console.log(error);
    },
    () => {
      console.log('Complete');      
    })
  }
  
  ngOnDestroy(): void {
    this.numbersSubscription.unsubscribe();
    this.customSubscription.unsubscribe();
  }
}
