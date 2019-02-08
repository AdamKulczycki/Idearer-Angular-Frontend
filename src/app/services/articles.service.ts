import { Article } from '../models/article-model';
import { Page } from '../models/page-model';
import { Injectable } from '@angular/core';
import { api } from './global-variables';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { StorageService } from './storage.service';
import { handleError } from '../shared/errorHandler';

@Injectable()
export class ArticlesService {
    constructor(private http: HttpClient, private storageService: StorageService) {}

    makeArticle(payload) {
        const token = this.storageService.get('access_token');
        const httpheaders = new HttpHeaders({
            'Authorization' : 'Bearer ' + token,
            'Content-Type': 'application/json'
        });
        return this.http.post(api + 'articles', JSON.stringify(payload), {headers: httpheaders})
        .pipe(
            map((res: any) => res),
            catchError(handleError)
        );
    }
    getArticles(page): Observable<Page> {

        const token = this.storageService.get('access_token');
        if (token) {
            const httpheaders = new HttpHeaders({
                'Authorization' : 'Bearer ' + token,
            });
            return this.http.get(api + 'articles?page=' + page + '&pageSize=2', {headers: httpheaders})
            .pipe(
                map((data: any) => new Page(data)),
                catchError(handleError)
            );
        } else {
            return this.http.get(api + 'articles?page=' + page + '&pageSize=2')
            .pipe(
                map((data: any) => new Page(data)),
                catchError(handleError)
            );
        }
    }


    getArticle(index: number) {

        const token = this.storageService.get('access_token');
        if (token) {
            const httpheaders = new HttpHeaders({
                'Authorization' : 'Bearer ' + token,
            });
            return this.http.get<Article>(api + 'articles/' + index, {headers: httpheaders})
            .pipe(
                map((data: any) => new Article(data)),
                catchError(handleError)
            );
        } else {
            return this.http.get<Article>(api + 'articles/' + index)
            .pipe(
                map((data: any) => new Article(data)),
                catchError(handleError)
            );
        }
    }

    getArtcilesByCategory(categoryName: string, page): Observable<Page> {

        const token = this.storageService.get('access_token');
        if (token) {
            const httpheaders = new HttpHeaders({
                'Authorization' : 'Bearer ' + token,
            });
            return this.http.get(api + 'articles?categoryName=' + categoryName + '&page=' + page + '&pageSize=2', {headers: httpheaders})
            .pipe(
                map((data: any) => new Page(data)),
                catchError(handleError)
            );
        } else {
            return this.http.get(api + 'articles?categoryName=' + categoryName + '&page=' + page + '&pageSize=2')
            .pipe(
                map((data: any) => new Page(data)),
                catchError(handleError)
            );
        }
    }

    getSortArticles(sortName: string, page): Observable<Page> {
        return this.http.get(api + 'articles?sort=' + sortName + '&page=' + page + '&pageSize=2')
            .pipe(
                map((data: any) => new Page(data)),
                catchError(handleError)
            );
    }

    getSortArticlesByCategory(categoryName: string, sortName, page): Observable<Page> {
        return this.http.get(api + 'articles?categoryName=' + categoryName + '&sort=' + sortName + '&page=' + page + '&pageSize=2')
            .pipe(
                map((data: any) => new Page(data)),
                catchError(handleError)
            );
    }

    getUserArticles(status): Observable<Article[]> {

        const Id = this.storageService.get('id');
        // const headers = new HttpHeaders({
        //     'Authorization': `Bearer ` + token
        // });

        return this.http.get(api + 'articles?authorId=' + Id + '&status=' + status)
        .pipe(
            map((data: any) => data.content.map((article) => new Article(article))),
            catchError(handleError)
        );
    }

    getPendingArtciles(): Observable<Article[]> {

        return this.http.get(api + 'articles?status=PENDING')
        .pipe(
            map((data: any) => data.content.map((article) => new Article(article))),
            catchError(handleError)
        );
    }

    patchArticle(id, payload) {

        const token = this.storageService.get('access_token');
        const httpheaders = new HttpHeaders({
            'Authorization' : 'Bearer ' + token,
            'Content-Type': 'application/json'
        });
        return this.http.patch(api + 'articles/' + id, JSON.stringify(payload),  {headers: httpheaders})
        .pipe(
            catchError(handleError)
        );
    }
}
