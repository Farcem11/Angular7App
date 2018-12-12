import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromAuth from '../auth/store/auth.reducers';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private store: Store<fromAuth.State>) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.store.select('auth')
    .pipe(
      take(1),
      map((state: fromAuth.State) => {
        if(!state.authenticated) {
          this.router.navigate(['auth/signin']);
          return false;
        }
        return true;
      })
    )
  }
}
