import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from './storage.service';
import { api } from './global-variables';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { RejectArticle } from '../models/rejectArticle.model';

@Injectable()
export class RejectsService {
    constructor(private http: HttpClient, private storageService: StorageService) {}

    rejectArticle(id, reason) {
        const token = this.storageService.get('access_token');
        const httpheaders = new HttpHeaders({
            'Authorization' : 'Bearer ' + token,
            'Content-Type': 'application/json'
        });
        const payload = {
            description: reason
        };
        return this.http.post(api + 'articles/' + id + '/rejects', JSON.stringify(payload), {headers: httpheaders});
    }

    getRejectsByArticleId(id) {
        const token = this.storageService.get('access_token');
        const httpheaders = new HttpHeaders({
            'Authorization' : 'Bearer ' + token,
            'Content-Type': 'application/json'
        });
        return this.http.get(api + 'articles/' + id + '/rejects', {headers: httpheaders})
            .pipe(
                map((res: any) => res),
                catchError((err: any) => {
                    throw(err);
                })
            );
    }

    getUserRejectArticles(): Observable<RejectArticle[]> {

        const Id = this.storageService.get('id');
        // const headers = new HttpHeaders({
        //     'Authorization': `Bearer ` + token
        // });

        return this.http.get(api + 'articles?authorId=' + Id + '&status=REJECTED')
        .pipe(
            map((data: any) => data.content.map((article) => new RejectArticle(article)))
        );
    }
}
