import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {

	numbers : Array<number> = [];

	addNumber(event : {number : number}) {
		this.numbers.push(event.number);
	}	

	serverElements = [{
		type : 'server',
		name : 'TestServer',
		content : 'Just a test!'
	}];

	onServerAdded(server : {name : string, content : string}) {
			this.serverElements.push({
			type: 'server',
			name: server.name,
			content: server.content
		});
	}

	onBluePrintAdded(bluePrint : {name : string, content : string}) {
		this.serverElements.push({
			type: 'blueprint',
			name: bluePrint.name,
			content: bluePrint.content
		});
	}

	onChangeFirst() {
		this.serverElements[0].name = "Changed!";
	}

	onDestroy() {
		this.serverElements.splice(0,1);
	}
}
