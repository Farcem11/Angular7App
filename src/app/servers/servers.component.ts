import { Component } from '@angular/core';

@Component({
	selector: 'app-servers',
	templateUrl: './servers.component.html',
	styleUrls: ['./servers.component.sass']
})

export class ServersComponent 
{
	private allowNewServer : boolean = false;
	private serverName : string = '';
	private serverStatus : string = 'No server created.'
	private servers : Array<String>;

	constructor() 
	{
		this.servers = ["1","2"];
		setTimeout(() => 
		{
			this.allowNewServer = true;
		},2000)
	}

	public onNewServer() : void
	{
		this.servers.push(this.serverName);
		this.serverStatus = 'Server added ' + this.serverName;
		this.serverName = '';
	}

	public isServerEmpty() : boolean
	{
		return this.serverName == '';
	}

	show = true;
	clicks = [];

	public onClick()
	{
		this.show = !this.show;
		this.clicks.push("");
	}
}