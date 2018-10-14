import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api } from './global-variables';
import { map } from 'rxjs/operators';
import { Comment } from '../models/comment-model';
import { StorageService } from './storage.service';

@Injectable()
export class CommentsService {
    constructor(private http: HttpClient, private storageService: StorageService) {}

    getComments(index: number): Observable<Comment[]> {
        return this.http.get(api + 'comments?articleId=' + index)
        .pipe(
            map((data: any[]) => data.map((comment) => new Comment(comment))
            )
        );
    } // zwraca komentarze do danego artykulu

    getUserComments(): Observable<Comment[]> {
        const Id = this.storageService.get('id');
        return this.http.get(api + 'comments?userId=' + Id)
        .pipe(
            map((data: any[]) => data.map((comment) => new Comment(comment))
            )
        );
    }
}
