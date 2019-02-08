import { HttpClient } from '@angular/common/http';
import { api } from './global-variables';
import { map, catchError } from 'rxjs/operators';
import { Category } from '../models/category-model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { handleError } from '../shared/errorHandler';

@Injectable()
export class CategoriesService {
    constructor(private http: HttpClient) {}

    getCategories(): Observable<Category[]> {
        return this.http.get(api + 'categories')
        .pipe(
            map((data: any[]) => data.map((category) => new Category(category))),
            catchError(handleError)
        );
    }
}
