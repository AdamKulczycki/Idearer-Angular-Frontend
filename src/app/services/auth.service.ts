import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
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
}
