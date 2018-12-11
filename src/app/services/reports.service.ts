import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from './storage.service';
import { api } from './global-variables';
import { Injectable } from '@angular/core';

@Injectable()
export class ReportsService {
    constructor(private http: HttpClient, private storageService: StorageService) {}

    reportArticle(payload) {
        const token = this.storageService.get('access_token');
        const httpheaders = new HttpHeaders({
            'Authorization' : 'Bearer ' + token,
            'Content-Type': 'application/json'
        });
        const id = payload.id;
        const body = {
            description: payload.description
        };
        return this.http.post(api + 'articles/' + id + '/reports', JSON.stringify(body), {headers: httpheaders});
    }
}
