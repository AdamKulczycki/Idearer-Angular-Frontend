import { User } from './user-model';

export class Article {
    public id: number; 
    public title: string;
    public content: string;
    public created : String;
    public likesCount: number;
    public user: User;
    public categoryName: string;
    public liked: boolean; 
    public commentsCount: number;

    constructor(jsonArticle) {
            this.id = jsonArticle.id;
            this.title = jsonArticle.title;
            this.content = jsonArticle.content;
            this.created = this.prettifyDate(jsonArticle.created)
            this.likesCount = jsonArticle.likesCount;
            this.user = jsonArticle.user;
            this.categoryName = jsonArticle.categoryName;
            this.liked = jsonArticle.liked;
            this.commentsCount = jsonArticle.commentsCount;
        }

        private prettifyDate(input: string) : String{
            let date : Date = new Date(input);
            let dateOptions: Intl.DateTimeFormatOptions = {
              day: "numeric", month: "numeric", year: "numeric"
            };
            let timeOptions: Intl.DateTimeFormatOptions = {
                hour: "2-digit", minute: "2-digit"
            }
            
          return date.toLocaleDateString("pl-PL", dateOptions) + " " + date.toLocaleTimeString("pl-PL", timeOptions);
        }

        deserialize(input: any): this {
            Object.assign(this, input);
            return this;
        }
}