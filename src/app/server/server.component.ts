import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.sass']
})
export class ServerComponent {

  private isServerOnline : boolean;
  private port : number = 8000;
  private ip : string = 'localhost';

  constructor() 
  {
    this.isServerOnline = Math.random() > 0.5;
  }

  private getColor() : string
	{
		return this.isServerOnline ? 'green' : 'red';;
	}

	private getServerStatus() : string
	{
		return this.isServerOnline ? 'online' : 'offline';;
  }
}
