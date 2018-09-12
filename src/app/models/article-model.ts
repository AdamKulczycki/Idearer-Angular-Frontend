import { User } from './user-model';

export class Article {
    constructor(public id: number, public title: string,
        public content: string, public created: string, public likesCount: number, public user: User, public categoryName: string, public liked: boolean, public commentsCount: number) {}
}
