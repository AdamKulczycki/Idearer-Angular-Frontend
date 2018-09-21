import { User } from './user-model';
import { Category } from './category-model';

export class Article {
    public id: number;
    public title: string;
    private _content: string;
    public created: string;
    public likesCount: number;
    public user: User;
    public category: Category;
    public liked: boolean;
    public commentsCount: number;

    constructor(jsonArticle) {
            this.id = jsonArticle.id;
            this.title = jsonArticle.title;
            this._content = jsonArticle.content;
            this.created = this.prettifyDate(jsonArticle.created);
            this.likesCount = jsonArticle.likesCount;
            this.user = jsonArticle.user;
            this.category = jsonArticle.category;
            this.liked = jsonArticle.liked;
            this.commentsCount = jsonArticle.commentsCount;
        }

        private prettifyDate(input: string): string {
            const date: Date = new Date(input);
            const dateOptions: Intl.DateTimeFormatOptions = {
              day: 'numeric', month: 'numeric', year: 'numeric'
            };
            const timeOptions: Intl.DateTimeFormatOptions = {
                hour: '2-digit', minute: '2-digit'
            };
          return date.toLocaleDateString('pl-PL', dateOptions) + ' ' + date.toLocaleTimeString('pl-PL', timeOptions);
        }

        deserialize(input: any): this {
            Object.assign(this, input);
            return this;
        }

        set content(content: string) {
            this._content = content;
        }
        get content() {
            return 'https://www.youtube.com/embed/' + this._content;
        }
}
