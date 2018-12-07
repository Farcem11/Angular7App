import { Component, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { stringify } from '@angular/core/src/util';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.css']
})
export class CockpitComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  @Output() serverCreated = new EventEmitter<{name : string, content : string}>();
  @Output() bluePrintCreated = new EventEmitter<{name : string, content : string}>();

  // newServerName = '';
  // newServerContent = '';

  @ViewChild('inputServerContent') inputServerContent : ElementRef;

  onAddServer(inputServerName : HTMLInputElement) {
    console.log(this.inputServerContent.nativeElement.value);
    
    this.serverCreated.emit({
      name : inputServerName.value,
      content : this.inputServerContent.nativeElement.value
    });
  }

  onAddBlueprint(inputServerName : HTMLInputElement) {
    this.bluePrintCreated.emit({
      name : inputServerName.value,
      content : this.inputServerContent.nativeElement.value
    });
  }
}
