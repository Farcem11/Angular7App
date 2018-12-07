import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  accounts : {name : string, status : string}[] = [];

  constructor(private dataService : DataService) {}

  ngOnInit(): void {
    this.accounts = this.dataService.accounts;
  }
}
