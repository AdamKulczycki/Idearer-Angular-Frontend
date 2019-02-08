import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from './storage.service';
import { api } from './global-variables';
import { map, catchError } from 'rxjs/operators';
import { handleError } from '../shared/errorHandler';


@Injectable()
export class LikesService {
    constructor(private http: HttpClient, private storageService: StorageService) {}

    articleChangeLike(payload) {
        const articleId = payload.articleId;
        const body = {
            liked: payload.liked
        };
        const token = this.storageService.get('access_token');
        const httpheaders = new HttpHeaders({
            'Authorization' : 'Bearer ' + token,
            'Content-Type': 'application/json'
        });
        return this.http.patch(api + 'articles/' + articleId, JSON.stringify(body), {headers: httpheaders})
        .pipe(
            map((res: any) => res),
            catchError(handleError)
        );
    }

    commentChangeLike(payload) {
        const commentId = payload.commentId;
        const body = {
            liked: payload.liked
        };
        const token = this.storageService.get('access_token');
        const httpheaders = new HttpHeaders({
            'Authorization' : 'Bearer ' + token,
            'Content-Type': 'application/json'
        });
        return this.http.patch(api + 'comments/' + commentId, JSON.stringify(body), {headers: httpheaders})
        .pipe(
            map((res: any) => res),
            catchError(handleError)
        );
    }
}
