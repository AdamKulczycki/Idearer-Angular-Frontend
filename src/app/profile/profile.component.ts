import { Component, OnInit } from '@angular/core';
import { Article } from '../models/article-model';
import { Comment } from '../models/comment-model';
import { User } from '../models/user-model';
import { ArticlesService } from '../services/articles.service';
import { CommentsService } from '../services/comments.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  constructor(private articlesService: ArticlesService,
    private commentsService: CommentsService,
    private router: Router) { }

  viewSelector = 'articles';
  articles: Article[] = [];
  comments: Comment[] = [];
  rejectedArticles: Article[] = [];
  waitingArticles: Article[] = [];

  showModal = false;

  showEditModal() {
    this.showModal = true;
    console.log('otwieram modal');
  }
  closeEditModal() {
    this.showModal = false;
    console.log('zamykam modal');
  }
  ngOnInit() {
    this.articlesService.getUserArticles('ACCEPTED_HOF').subscribe(
      (res) => {
        this.articles.push(...res);
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
    this.articlesService.getUserArticles('ACCEPTED').subscribe(
      (res) => {
        this.articles.push(...res);
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
    this.articlesService.getUserArticles('PENDING').subscribe(
      (res) => {
        this.waitingArticles = res;
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
    this.articlesService.getUserArticles('REJECTED').subscribe(
      (res) => {
        this.rejectedArticles = res;
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
