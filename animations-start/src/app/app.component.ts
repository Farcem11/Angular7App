import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [
    trigger('divState', [
      state('normal', style({
        backgroundColor: 'red',
        transform: 'translateX(0)'
      })),
      state('hightlighted', style({
        backgroundColor: 'blue',
        transform: 'translateX(100px)'
      })),
      transition('normal <=> hightlighted', animate(300))
      // transition('hightlighted => normal', animate(800))
    ]),
    trigger('wildState', [
      state('normal', style({
        backgroundColor: 'red',
        transform: 'translateX(0) scale(1)'
      })),
      state('hightlighted', style({
        backgroundColor: 'blue',
        transform: 'translateX(100px) scale(1)'
      })),
      state('shrunken', style({
        backgroundColor: 'green',
        borderRadius: '50px'
      })),
      transition('normal => hightlighted', animate(300)),
      transition('hightlighted => normal', animate(800)),
      transition('shrunken <=> *', [
        animate(1000, style({
          backgroundColor: 'orange'
        })),
        animate(1000, style({
          transform: 'scale(0.5)',
        })),
        animate(1000)
      ])
    ])  
  ]
})

export class AppComponent {
  state = 'normal';
  wildState = 'normal';
  list = ['Milk', 'Sugar', 'Bread'];

  onAnimate() {
    this.state === 'normal' ? this.state = 'hightlighted' : this.state = 'normal';
    this.wildState === 'normal' ? this.wildState = 'hightlighted' : this.wildState = 'normal';
  }

  onShrink() {
    this.wildState = 'shrunken';
  }

  onAdd(item) {
    this.list.push(item);
  }
}
