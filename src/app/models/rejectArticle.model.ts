import { Article } from './article-model';

export class RejectArticle {
    article: Article;
    description: string;

    constructor(article) {
        this.article = article;
        this.description = '';
    }
}
