import { Component } from '@angular/core';
import { trigger, state, style, transition, animate, keyframes, group } from '@angular/animations';

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
        transform: 'scale(0.5)'
      })),
      transition('normal => hightlighted', animate(300)),
      transition('hightlighted => normal', animate(800)),
      transition('shrunken <=> *', [
        animate(5000, keyframes([
          style({
            borderLeft: '50px solid transparent',
            borderRight: '50px solid transparent',
            borderBottom: '100px solid red',
            backgroundColor: 'white',
          }),
          style({
            borderLeft: '50px solid transparent',
            borderRight: '50px solid transparent',
            borderTop: '100px solid red',
            borderBottom: '0px',
            backgroundColor: 'white',
          })
        ])),
        animate(500)
      ])
    ]),
    trigger('list1', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100px)'
        }),
        animate(300)
      ]),
      transition('* => void', [
        group([
          animate(300, style({
            color: 'red'
          })),
          animate(1000, style({
            opacity: 0,
            transform: 'translateX(100px)'
          }))
        ])
      ])
    ]),
    trigger('list2', [
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),
      transition('void => *', [
        animate(1000, keyframes([
          style({
            transform: 'translate(-100px)',
            opacity: 0,
            offset: 0
          }),
          style({
            transform: 'translate(-50px)',
            opacity: 0.5,
            offset: 0.3
          }),
          style({
            transform: 'translate(-20px)',
            opacity: 1,
            offset: 0.8
          }),
          style({
            transform: 'translate(0px)',
            opacity: 1,
            offset: 1
          })
        ]))
      ]),
      transition('* => void', [
        animate(300, style({
          opacity: 0,
          transform: 'translateX(100px)'
        }))
      ])
    ]),
  ]
})

export class AppComponent {
  state = 'normal';
  wildState = 'normal';
  nameState = 'normal';

  list = ['Milk', 'Sugar', 'Bread'];

  onAnimate() {
    this.state === 'normal' ? this.state = 'hightlighted' : this.state = 'normal';
    this.wildState === 'normal' ? this.wildState = 'hightlighted' : this.wildState = 'normal';
    this.nameState === 'normal' ? this.nameState = 'changed' : this.nameState = 'normal';
  }

  onShrink() {
    this.wildState = 'shrunken';
  }

  onAdd(item) {
    this.list.push(item);
  }

  onDelete(index) {
    this.list.splice(index, 1);
  }

  addingItem(event) {
    console.log(event);
  }

  itemAdded(event) {
    console.log(event);
  }
}
