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

    getIdsOfReportedArticles(): Observable<Object> {
        const token = this.storageService.get('access_token');
        const httpheaders = new HttpHeaders({
            'Authorization' : 'Bearer ' + token,
            'Content-Type': 'application/json'
        });

        return this.http.get(api + 'articles/reported', {headers: httpheaders})
        .pipe(
            catchError(handleError)
        );
    }

    getReportsByArticleId(id): Observable<Report[]> {
        const token = this.storageService.get('access_token');
        const httpheaders = new HttpHeaders({
            'Authorization' : 'Bearer ' + token,
            'Content-Type': 'application/json'
        });

        return this.http.get(api + 'articles/' + id + '/reports', {headers: httpheaders}).pipe(
            map((data: any) => data.content.map(report => new Report(report))),
            catchError(handleError)
        );
    }

    deleteReport(id): Observable<any> {
        const token = this.storageService.get('access_token');
        const httpheaders = new HttpHeaders({
            'Authorization' : 'Bearer ' + token,
            'Content-Type': 'application/json'
        });

        return this.http.delete(api + 'articles/reports/' + id, {headers: httpheaders})
        .pipe(
            catchError(handleError)
        );
    }

    test() {
    const httpheaders = new HttpHeaders({
        'Authorization' : 'Bearer ' + this.storageService.get('access_token'),
        'Content-Type': 'application/json'
    });
    // return this.http.get(api + 'articles/reported', {headers: httpheaders}).pipe(
    //         map((res: Array<number>) => {
    //                 forkJoin(
    //                     res.map(
    //                         id => this.http.get<Article>(api + 'articles/' + id, {headers: httpheaders})
    //                         .pipe(
    //                             map((article: any) => {
    //                                 console.log('article')
    //                                 const art = new Article(article);
    //                                 const array = []
    //                                 array.push(art);
    //                                 return this.http.get(api + 'articles/' + id + '/reports', {headers: httpheaders})
    //                                 .pipe(map((reportsRes: any) => {
    //                                     console.log('report')
    //                                     const reports = reportsRes.content.map(report => new Report(report))
    //                                     array.push(reports);
    //                                     // return ({art, reports});
    //                                     return array;
    //                                 }));
    //                                 // .pipe(
    //                                 //     map((reportsRes: any) => {
    //                                 //         const reports = reportsRes.content.map(report => new Report(report))
    //                                 //         return ({art, reports});
    //                                 //     }));
    //                         }))
    //                     )
    //                 ).subscribe(
    //                     e => console.log(e[0].subscribe(r=>console.log(r)))
    //                 );
    //         }));

    // return forkJoin(
    //     this.http.get(api + 'articles/reported', {headers: httpheaders}).pipe(
    //         map((res: Array<number>) => {
    //             return forkJoin(
    //                 forkJoin(
    //                     res.map(
    //                         id => this.http.get<Article>(api + 'articles/' + id, {headers: httpheaders})
    //                         .pipe(map(response => <Article>response))
    //                     ),
    //                 ),
    //                 forkJoin(
    //                     res.map(
    //                         id => this.http.get(api + 'articles/' + id + '/reports', {headers: httpheaders}).pipe(
    //                             map((data: any) => data.content.map(report => new Report(report))))
    //                     )
    //                 )
    //             ).pipe(
    //                 map(
    //                     r => {
    //                         const reportsArray = [];
    //                         for (let i = 0; i < r[0].length; i ++) {
    //                             reportsArray.push({
    //                                 articleObject: r[0][i],
    //                                 showArticle: false,
    //                                 showPanel: false,
    //                                 articleReports: r[1][i]
    //                             });
    //                         }
    //                         return reportsArray;
    //                     }
    //                 )
    //             )
    //         }))
    // );

    const reportsArray = [];
    return this.http.get(api + 'articles/reported', {headers: httpheaders}).pipe(
        map((res: Array<number>) => {
            forkJoin(
                forkJoin(
                    res.map(
                        id => this.http.get<Article>(api + 'articles/' + id, {headers: httpheaders})
                        .pipe(map(response => <Article>response))
                    ),
                ),
                forkJoin(
                    res.map(
                        id => this.http.get(api + 'articles/' + id + '/reports', {headers: httpheaders}).pipe(
                            map((data: any) => data.content.map(report => new Report(report))))
                    )
                )
            )
            .subscribe(res1 => {
                for (let i = 0; i < res1[0].length; i ++) {
                    reportsArray.push({
                        articleObject: res1[0][i],
                        showArticle: false,
                        showPanel: false,
                        articleReports: res1[1][i]
                    });
                }
                console.log('kek')
                // return reportsArray;
            });
            console.log('zrobilem')
            return reportsArray;
        })
    );

    // this.getIdsOfReportedArticles().subscribe(
    //     (res: Array<number>) => {
    //         forkJoin(
    //             forkJoin(
    //                 res.map(
    //                     id => this.http.get<Article>(api + 'articles/' + id, {headers: httpheaders})
    //                     .pipe(map(response => <Article>response))
    //                 ),
    //             ),
    //             forkJoin(
    //                 res.map(
    //                     id => this.http.get(api + 'articles/' + id + '/reports', {headers: httpheaders}).pipe(
    //                         map((data: any) => data.content.map(report => new Report(report))))
    //                 )
    //             )
    //         )
    //         .subscribe(res1 => {
    //             // console.log(res1);
    //             for (let i = 0; i < res1[0].length; i ++) {
    //                 reportsArray.push({
    //                     articleObject: res1[0][i],
    //                     showArticle: false,
    //                     showPanel: false,
    //                     articleReports: res1[1][i]
    //                 });
    //             }
    //             console.log('kek')
    //             return reportsArray;
    //         });
    //     }
    // );
    // console.log(reportsArray)
    // const reportsArray = [];
    // this.getIdsOfReportedArticles().pipe()
    //   .subscribe(
    //     (res: Array<number>) => {
    //       res.forEach(id => {
    //         let article: Article;
    //         this.articlesService.getArticle(id)
    //             .subscribe(
    //             articleRes => article = articleRes,
    //             err => console.log(err)
    //             );
    //         this.getReportsByArticleId(id)
    //           .subscribe(
    //             (reports: Report[]) => {
    //               reportsArray.push({
    //                 articleObject: article,
    //                 showArticle: false,
    //                 showPanel: false,
    //                 articleReports: reports
    //               });
    //             //   this.reportsNumber += reports.length;
    //             },
    //             (err) => console.log(err)
    //           );
    //       });
    //     },
    //     (err) => console.log(err)
    //   );
    }
}
