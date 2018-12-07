import { Component } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-new-account',
  templateUrl: './new-account.component.html',
  styleUrls: ['./new-account.component.css']
})
export class NewAccountComponent {

  constructor(private dataService : DataService) {
    this.dataService.updatedStatus.subscribe(status => {
      alert(status);
    })
  }

  onCreateAccount(accountName: string, accountStatus: string) {

    this.dataService.addAccount(accountName, accountStatus)
  }
}
