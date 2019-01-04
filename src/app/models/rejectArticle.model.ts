import { Article } from './article-model';
import { RejectInfo } from './rejectInfo-model';

export class RejectArticle {
    article: Article;
    rejectInfo: RejectInfo[];

    constructor(article) {
        this.article = article;
        this.rejectInfo = [];
    }
}
