import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { StorageService } from './storage.service';
import { User } from '../models/user-model';
import { api } from './global-variables';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient, private storageSrv: StorageService) { }

  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }
  public isLogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public signUp(payload: any): Observable<User>{

    return this.http.post(api + 'users', JSON.stringify(payload), this.httpOptions)
      .pipe(
        map((data: any) =>  
          { return new User(data) }
        , catchError((err: HttpErrorResponse) => 
          {throw(err)}
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
        catchError((err: any) => {throw(err)})
      )
  }

  public logOut() {
    this.storageSrv.remove('access_token');
  }
}
