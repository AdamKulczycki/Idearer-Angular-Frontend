import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from './storage.service';
import { api } from './global-variables';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Report } from '../models/report-model';
import { handleError } from '../shared/errorHandler';


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
        return this.http.post(api + 'articles/' + id + '/reports', JSON.stringify(body), {headers: httpheaders})
        .pipe(
            catchError(handleError)
        );
    }

    getIdsOfReportedArticles() {
        const token = this.storageService.get('access_token');
        const httpheaders = new HttpHeaders({
            'Authorization' : 'Bearer ' + token,
            'Content-Type': 'application/json'
        });

        return this.http.get(api + 'articles/reported', {headers: httpheaders})
        .pipe(
            catchError(handleError)
        );
    }

    getReportsByArticleId(id) {
        const token = this.storageService.get('access_token');
        const httpheaders = new HttpHeaders({
            'Authorization' : 'Bearer ' + token,
            'Content-Type': 'application/json'
        });

        return this.http.get(api + 'articles/' + id + '/reports', {headers: httpheaders}).pipe(
            map((data: any) => data.content.map(report => new Report(report))),
            catchError(handleError)
        );
    }

    deleteReport(id) {
        const token = this.storageService.get('access_token');
        const httpheaders = new HttpHeaders({
            'Authorization' : 'Bearer ' + token,
            'Content-Type': 'application/json'
        });

        return this.http.delete(api + 'articles/reports/' + id, {headers: httpheaders})
        .pipe(
            catchError(handleError)
        );
    }
}
