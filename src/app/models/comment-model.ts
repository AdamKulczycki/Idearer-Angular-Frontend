import { User } from './user-model';

export class Comment {
    public id: number;
    public content: string;
    public created: string;
    public likesCount: number;
    public user: User;
    public comments: Comment[];
    public liked: boolean
    constructor(commentJson) {
        this.id = commentJson.id;
        this.content = commentJson.content;
        this.created = this.prettifyDate(commentJson.created);
        this.likesCount = commentJson.likesCount;
        this.user = commentJson.user;
        this.comments = commentJson.comments.map(comment => new Comment(comment));
        this.liked = commentJson.liked;
    }

    private prettifyDate(input: string) : string{
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

