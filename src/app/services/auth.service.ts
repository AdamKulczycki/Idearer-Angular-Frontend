import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { StorageService } from './storage.service';
import { User } from '../models/user-model';
import { api } from './global-variables';
import { handleError } from '../shared/errorHandler';


@Injectable()
export class AuthService {

  constructor(private http: HttpClient, private storageSrv: StorageService, private router: Router) { }

  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };
  public isLogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public signUp(payload: any): Observable<User> {

    return this.http.post(api + 'users', JSON.stringify(payload), this.httpOptions)
      .pipe(
        map((data: any) => {
          return new User(data);
        }, /// DLACZEGO CATCH JEST W MAPIE?
        catchError((err: HttpErrorResponse) => {
          throw(err); }
        )
        )
    );
  }

  public signIn(user: string, password: string): Observable<any> {

    const body = new HttpParams()
      .set(`grant_type`, `password`)
      .set(`username`, user)
      .set(`password`, password);

    const headers = new HttpHeaders({
      'Content-Type': `application/x-www-form-urlencoded`,
      'Authorization': `Basic Y2xpZW50OnNlY3JldA==`})

    return this.http.post(api + 'oauth/token', body.toString(), { headers: headers, withCredentials: true })
      .pipe(
        map((res: any) => res),
        catchError(handleError)
      );
  }

  public logOut() {
    this.storageSrv.clear();
    this.setIsLogged(false);
    this.router.navigateByUrl('');
  }

  public setIsLogged(value: boolean) {
    this.isLogged.next(value);
  }
}
