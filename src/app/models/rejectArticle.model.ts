import { Article } from './article-model';
import { RejectInfo } from './rejectInfo-model';

export class RejectArticle {
    article: Article;
    rejectInfo: RejectInfo[];
    showModal: boolean;

    constructor(article) {
        this.article = article;
        this.rejectInfo = [];
        this.showModal = false;
    }
}
