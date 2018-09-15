import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { StorageService } from './storage.service';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient, private storageSrv: StorageService) { }

  public signUp(payload: any): Observable<any> {

    return this.http.post('https://idearer.herokuapp.com/' + 'users', payload)
      .pipe(
        map(user => {

          if (user) {
            
            this.storageSrv.set('currentUser', JSON.stringify(user));
          }

          return user;
        }
      )
    );
  }
}
