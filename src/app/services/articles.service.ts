import { Article } from '../models/article-model';
import { User } from '../models/user-model';
import { Injectable } from '@angular/core';
import { api } from './global-variables';
import { HttpClient } from '@angular/common/http';
import { Comment } from '../models/comment-model';
import { Observable, Subject, throwError} from 'rxjs';
import { map } from 'rxjs/operators';
import { Http } from '@angular/http';


@Injectable()
export class ArticlesService {
    constructor(private http: HttpClient) {}

    getArticles() : Observable<Article[]> {
        return this.http.get(api + 'articles')
        .pipe(
            map((data : any[]) => data.map((element) => 
                new Article(
                element.id,
                element.title,
                element.content,
                element.created,
                element.likesCount,
                element.user,
                element.categoryName,
                element.liked,
                element.commentsCount
                ))
            )  
        )       
    }// zwraca artykuly na glowna strone, co 10 na przyklad, te najnowsze


    getArticle(index: number) {
        return this.http.get<Article>(api + 'articles/' + index);
    }

    getArtcilesByCategory() {} // zwraca artykulu danej kategori co 10 na przyklad

    getComments(index: number) {
        return this.http.get<Comment[]>(api + 'comments?articleId=' + index);
    } // zwraca komentarze do danego artykulu

    /* private articles: Article[] = [
        new Article(1, 'Ramen', 'https://www.youtube.com/embed/B8y3SSmz4sg', '10/01/2018', 201, new User(1, 'Admin'), 'Kitchen', false),
        new Article(2, 'lol', 'https://www.youtube.com/embed/7kSPCWcs7cc', '10/01/2018', 201, new User(2, 'chinkchiankchionk'), 'Tools', false)
    ]; */
}
