import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { api } from './global-variables';
import { map, catchError } from 'rxjs/operators';
import { Comment } from '../models/comment-model';
import { StorageService } from './storage.service';
import { handleError } from '../shared/errorHandler';


@Injectable()
export class CommentsService {
    constructor(private http: HttpClient, private storageService: StorageService) {}

    public $activeCommentForm = new BehaviorSubject<number>(null);
    setActiveCommentForm (id) {
        this.$activeCommentForm.next(id);
    }

    getComments(index: number): Observable<Comment[]> {
        const token = this.storageService.get('access_token');
        if (token) {
            const httpheaders = new HttpHeaders({
                'Authorization' : 'Bearer ' + token
            });
            return this.http.get(api + 'comments?articleId=' + index + '&parentCommentId=0', {headers: httpheaders})
            .pipe(
                map((data: any[]) => data.map((comment) => new Comment(comment))),
                catchError(handleError)
            );
        } else {
            return this.http.get(api + 'comments?articleId=' + index + '&parentCommentId=0')
            .pipe(
                map((data: any[]) => data.map((comment) => new Comment(comment))),
                catchError(handleError)
            );
        }
    }

    getUserComments(): Observable<Comment[]> {
        const Id = this.storageService.get('id');
        return this.http.get(api + 'comments?userId=' + Id + '&hideSubcomments=true')
        .pipe(
            map((data: any[]) => data.map((comment) => new Comment(comment))),
            catchError(handleError)
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
            catchError(handleError)
        );
    }
}
