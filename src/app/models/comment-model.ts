import { User } from './user-model';

export class Comment {
    constructor(public id: number, public content: string, public created: string, public likesCount: number, public user: User, public comments: Comment[], public liked: boolean ) {}
}

