import { Article } from './article-model';

export class Page {

    page: number;
    pageSize: number;
    lastPage: number;
    articles: Article[];

    constructor(Json) {
        this.page = Json.page;
        this.pageSize = Json.pageSize;
        this.lastPage = Json.lastPage;
        this.articles = Json.content.map(article => new Article(article));
    }
}
