import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {

  number : number = 0;
  timer : NodeJS.Timer;

  @Output() onIncrementingEvent = new EventEmitter<{number : number}>();

  constructor() { }

  ngOnInit() {
  }

  onStart() {
    this.timer = setInterval(() => {
      this.onIncrementingEvent.emit({
        number : this.number++
      })
    }, 1000);
  }

  onStop() {
    clearInterval(this.timer);
  }
}
