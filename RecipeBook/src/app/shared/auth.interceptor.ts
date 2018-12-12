import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import * as fromAuth from "../auth/store/auth.reducers";
import { Store } from "@ngrx/store";
import { switchMap, take } from "rxjs/operators";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private store: Store<fromAuth.State>) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('Intercepted!', req);

        return this.store.select('auth')
        .pipe(
            take(1),
            switchMap((state: fromAuth.State) => {
            const copiedReq = req.clone({
                params: req.params.set('auth', state.token)
            });
            return next.handle(copiedReq);
        }))
    }
}