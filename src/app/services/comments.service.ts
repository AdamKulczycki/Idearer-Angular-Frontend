import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api } from './global-variables';
import { map, catchError } from 'rxjs/operators';
import { Comment } from '../models/comment-model';
import { StorageService } from './storage.service';

@Injectable()
export class CommentsService {
    constructor(private http: HttpClient, private storageService: StorageService) {}

    getComments(index: number): Observable<Comment[]> {
        const token = this.storageService.get('access_token');
        if (token) {
            const httpheaders = new HttpHeaders({
                'Authorization' : 'Bearer ' + token
            });
            return this.http.get(api + 'comments?articleId=' + index + '&parentCommentId=0', {headers: httpheaders})
            .pipe(
                map((data: any[]) => data.map((comment) => new Comment(comment))
                )
            );
        } else {
            return this.http.get(api + 'comments?articleId=' + index + '&parentCommentId=0')
        // &parentCommentId=0 zwraca glowne komentarze artykulu
            .pipe(
                map((data: any[]) => data.map((comment) => new Comment(comment))
                )
            );
        }
    } // zwraca komentarze do danego artykulu

    getUserComments(): Observable<Comment[]> {
        const Id = this.storageService.get('id');
        return this.http.get(api + 'comments?userId=' + Id)
        .pipe(
            map((data: any[]) => data.map((comment) => new Comment(comment))
            )
        );
    }

    makeComment(payload) {
        const token = this.storageService.get('access_token');
        const httpheaders = new HttpHeaders({
            'Authorization' : 'Bearer ' + token,
            'Content-Type': 'application/json'
        });
        return this.http.post(api + 'comments', JSON.stringify(payload), {headers: httpheaders})
        .pipe(
            map((res: any) => new Comment(res)),
            catchError((err: any) => {
                throw(err);
            })
        );
    }
}
