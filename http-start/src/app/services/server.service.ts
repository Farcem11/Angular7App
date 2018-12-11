import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { ResolveOptions } from 'dns';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  constructor(private http: Http) { }

  storeServers(servers: any[]) {
    const headers = new Headers({
      'Content-Type' : 'application/json' 
    });

    // return this.http.post('https://udemy-ng-http-2a73e.firebaseio.com/data.json', servers, {headers: headers});
    return this.http.put('https://udemy-ng-http-2a73e.firebaseio.com/data', servers, {headers: headers});
  }

  getServers() {
    return this.http.get('https://udemy-ng-http-2a73e.firebaseio.com/data')
    .map((response: Response) => {
      const data = response.json();
      data.forEach(element => {
        element.name = 'FETCHED_' + element.name;
      });
      return data;
    })
    .catch((error: Response) => {
      return Observable.throw('Something went wrong');
    });
  }

  getAppName() {
    return this.http.get('https://udemy-ng-http-2a73e.firebaseio.com/AppName.json')
    .map((response: Response) => {
      return response.json();
    });
  }
}
