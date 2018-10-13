import { Article } from '../models/article-model';
import { Injectable } from '@angular/core';
import { api } from './global-variables';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Comment } from '../models/comment-model';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { StorageService } from './storage.service';

@Injectable()
export class ArticlesService {
    constructor(private http: HttpClient, private localStorage: StorageService) {}

    getArticles(): Observable<Article[]> {
        return this.http.get(api + 'articles')
        .pipe(
            map((data: any[]) => data.map((article) => new Article(article))
            )
        );
    }// zwraca artykuly na glowna strone, co 10 na przyklad, te najnowsze


    getArticle(index: number) {
        return this.http.get<Article>(api + 'articles/' + index)
        .pipe(
            map((data: any) => new Article(data))
        );
    }

    getArtcilesByCategory(categoryName: string): Observable<Article[]> {
        return this.http.get(api + 'articles?categoryName=' + categoryName)
            .pipe(
                map((data: any[]) => data.map((article) => new Article(article))
                )
            );
    } // zwraca artykulu danej kategori co 10 na przyklad

    getComments(index: number): Observable<Comment[]> {
        return this.http.get(api + 'comments?articleId=' + index)
        .pipe(
            map((data: any[]) => data.map((comment) => new Comment(comment))
            )
        );
    } // zwraca komentarze do danego artykulu

    // getUserArticles(id): Observable<Article[]> {

    //     const Id = this.localStorage.get('');
    //     const headers = new HttpHeaders({
    //         'Authorization': `Bearer ` + token
    //     });

    //     return this.http.get(api + 'articles/?authorId=' + id)
    //     .pipe(
    //         map((data: any[]) => data.map((article) => new Article(article)))
    //     );
    // }
}
