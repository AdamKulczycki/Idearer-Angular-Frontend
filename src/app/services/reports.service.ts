import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from './storage.service';
import { api } from './global-variables';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Report } from '../models/report-model';
import { handleError } from '../shared/errorHandler';
import { Article } from '../models/article-model';
import { ArticlesService } from './articles.service';
import { forkJoin, merge, Observable } from 'rxjs';
import { Page } from '../models/page-model';


@Injectable()
export class ReportsService {
    constructor(private http: HttpClient, private storageService: StorageService, private articlesService: ArticlesService) {}

    reportArticle(payload): Observable<any> {
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

    deleteArticleReports(id): Observable<any> {
        const token = this.storageService.get('access_token');
        const httpheaders = new HttpHeaders({
            'Authorization' : 'Bearer ' + token,
            'Content-Type': 'application/json'
        });

        return this.http.delete(api + `articles/${id}/reports`, {headers: httpheaders})
        .pipe(
            catchError(handleError)
        );
    }

    getReports() {
    const httpheaders = new HttpHeaders({
        'Authorization' : 'Bearer ' + this.storageService.get('access_token'),
        'Content-Type': 'application/json'
    });
    return this.http.get(api + 'articles/reports', {headers: httpheaders})
        .pipe(
            map(res => res),
            catchError(handleError)
        );
    }
}
