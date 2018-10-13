import { Component, OnInit } from '@angular/core';
import { Article } from '../models/article-model';
import { Comment } from '../models/comment-model';
import { User } from '../models/user-model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  viewSelector = 'articles';
  constructor() { }

  user = {
    email: 'test@test.pl',
    id: 1,
    password: 'test',
    username: 'admin'
  };
  article = new Article({
    id: undefined,
    title: 'Your title',
    content: 'iuBngI-GlWU',
    created: new Date(),
    likesCount: 5,
    user: new User(this.user),
    category: undefined,
    liked: true,
    commentsCount: 0
  });
  comment = new Comment(
    {
      id: undefined,
      content: 'no czesc',
      created: new Date(),
      likesCount: 210,
      user: new User(this.user),
      comments: [],
      liked: true
    });
  articles: Article[] = [];
  comments: Comment[] = [];
  rejectedArticles: Article[] = [];
  waitingArticles: Article[] = [];
  ngOnInit() {
  }

  viewSelectorChange(selector) {
    this.viewSelector = selector;
  }
}
