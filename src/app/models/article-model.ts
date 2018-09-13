import { User } from './user-model';

export class Article {
    public created : String;

    constructor(public id: number, 
        public title: string,
        public content: string, 
        private date: string, 
        public likesCount: number, 
        public user: User, 
        public categoryName: string, 
        public liked: boolean, 
        public commentsCount: number) {
            this.created = this.prettifyDate(date)
        }

        private prettifyDate(input: string) : String{
            let date : Date = new Date(input);
            let options: Intl.DateTimeFormatOptions = {
              day: "numeric", month: "numeric", year: "numeric",
              hour: "2-digit", minute: "2-digit"
          };
            
          return date.toLocaleDateString("pl-PL", options);
          }
}