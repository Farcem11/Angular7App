import { LoggingService } from "./logging.service";
import { Injectable, EventEmitter } from "@angular/core";

@Injectable()
export class DataService {

    constructor(private loggingService : LoggingService) {}

    accounts = [
        {
            name: 'Master Account',
            status: 'active'
        },
        {
            name: 'Testaccount',
            status: 'inactive'
        },
        {
            name: 'Hidden Account',
            status: 'unknown'
        }
    ];

    updatedStatus = new EventEmitter<string>();

    addAccount(name: string, status: string) {
        this.accounts.push({name, status});
        this.loggingService.logStatusChange(status);
    }
    
    changeStatus(id: number, newStatus: string) {
        this.accounts[id].status = newStatus;
        this.loggingService.logStatusChange(status);
    }
}