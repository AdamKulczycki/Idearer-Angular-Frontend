import { Component, OnInit } from '@angular/core';
import { Article } from '../models/article-model';
import { Comment } from '../models/comment-model';
import { User } from '../models/user-model';
import { RejectArticle } from '../models/rejectArticle.model';
import { ArticlesService } from '../services/articles.service';
import { CommentsService } from '../services/comments.service';
import { Router } from '@angular/router';
import { RejectsService } from '../services/rejects.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  constructor(private articlesService: ArticlesService,
    private commentsService: CommentsService,
    private router: Router,
    private rejectsService: RejectsService) { }

  viewSelector = 'articles';
  articles: Article[] = [];
  articlesHof: Article[] = [];
  comments: Comment[] = [];
  rejectedArticles: RejectArticle[] = [];
  rejects = [];
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
        this.articlesHof.push(...res);
      },
      (err) => {
        console.log(err);
      }
    );
    this.articlesService.getUserArticles('ACCEPTED').subscribe(
      (res) => {
        this.articles.push(...res);
      },
      (err) => {
        console.log(err);
      }
    );
    this.articlesService.getUserArticles('PENDING').subscribe(
      (res) => {
        this.waitingArticles = res;
      },
      (err) => {
        console.log(err);
      }
    );
    this.rejectsService.getUserRejectArticles().subscribe(
      (res) => {
        this.rejectedArticles = res;
        this.rejectedArticles.forEach(element => {
          this.rejectsService.getRejectsByArticleId(element.article.id)
            .subscribe(
              response => element.rejectInfo = response,
              err => console.log(err)
            );
        });
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
