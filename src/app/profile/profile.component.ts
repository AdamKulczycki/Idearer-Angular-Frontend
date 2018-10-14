import { Component, OnInit } from '@angular/core';
import { Article } from '../models/article-model';
import { Comment } from '../models/comment-model';
import { User } from '../models/user-model';
import { ArticlesService } from '../services/articles.service';
import { CommentsService } from '../services/comments.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  constructor(private articlesService: ArticlesService, private commentsService: CommentsService) { }

  viewSelector = 'articles';
  articles: Article[] = [];
  comments: Comment[] = [];
  rejectedArticles: Article[] = [];
  waitingArticles: Article[] = [];
  ngOnInit() {
    this.articlesService.getUserArticles().subscribe(
      (res) => {
        this.articles = res;
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
    this.commentsService.getUserComments().subscribe(
      (res) => {
        this.comments = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  viewSelectorChange(selector) {
    this.viewSelector = selector;
  }
}
