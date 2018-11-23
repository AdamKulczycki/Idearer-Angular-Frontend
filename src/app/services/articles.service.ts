import { Article } from '../models/article-model';
import { Injectable } from '@angular/core';
import { api } from './global-variables';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { StorageService } from './storage.service';

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
            catchError((err: any) => {
                throw(err);
            })
        );
    }
    getArticles(page): Observable<Article[]> {
        const token = this.storageService.get('access_token');
        console.log(token);
        if (token) {
            const httpheaders = new HttpHeaders({
                'Authorization' : 'Bearer ' + token,
            });
            return this.http.get(api + 'articles?page=' + page + '&pageSize=2', {headers: httpheaders})
            .pipe(
                map((data: any) => data.content.map((article) => new Article(article))
                )
            );
        } else {
            return this.http.get(api + 'articles?page=' + page + '&pageSize=2')
            .pipe(
                map((data: any) => data.content.map((article) => new Article(article))
                )
            );
        }
    }// zwraca artykuly na glowna strone, co 10 na przyklad, te najnowsze


    getArticle(index: number) {
        return this.http.get<Article>(api + 'articles/' + index)
        .pipe(
            map((data: any) => new Article(data))
        );
    }

    getArtcilesByCategory(categoryName: string, page): Observable<Article[]> {
        return this.http.get(api + 'articles?categoryName=' + categoryName + '&page=' + page + '&pageSize=2')
            .pipe(
                map((data: any) => data.content.map((article) => new Article(article))
                )
            );
    } // zwraca artykulu danej kategori co 10 na przyklad

    getUserArticles(): Observable<Article[]> {

        const Id = this.storageService.get('id');
        // const headers = new HttpHeaders({
        //     'Authorization': `Bearer ` + token
        // });

        return this.http.get(api + 'articles/?authorId=' + Id)
        .pipe(
            map((data: any) => data.content.map((article) => new Article(article)))
        );
    } // zwraca artykulu usera o danym ID
}
