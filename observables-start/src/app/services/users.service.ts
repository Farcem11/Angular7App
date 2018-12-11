import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  userActivated: Subject<number> = new Subject();

  constructor() { }
}
