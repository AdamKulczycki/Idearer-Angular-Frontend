import { User } from './user-model';
import { Category } from './category-model';

export class Article {
    public id: number;
    public title: string;
    public content: string;
    public created: string;
    public likesCount: number;
    public user: User;
    public category: Category;
    public liked: boolean;
    public commentsCount: number;

    constructor(jsonArticle) {
            this.id = jsonArticle.id;
            this.title = jsonArticle.title;
            this.content = jsonArticle.content;
            this.created = jsonArticle.created;
            this.likesCount = jsonArticle.likesCount;
            this.user = jsonArticle.user;
            this.category = jsonArticle.category;
            this.liked = jsonArticle.liked;
            this.commentsCount = jsonArticle.commentsCount;
        }
}
