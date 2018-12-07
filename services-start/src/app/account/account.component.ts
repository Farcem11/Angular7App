import { Component, Input } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  @Input() account: {name: string, status: string};
  @Input() id: number;

  constructor(private dataService : DataService) {}

  onSetTo(status: string) {
    this.dataService.changeStatus(this.id, status);
    this.dataService.updatedStatus.emit(status);
  }
}
