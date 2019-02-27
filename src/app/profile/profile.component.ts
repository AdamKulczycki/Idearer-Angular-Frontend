import { Component, OnInit } from '@angular/core';
import { Article } from '../models/article-model';
import { Comment } from '../models/comment-model';
import { RejectArticle } from '../models/rejectArticle.model';
import { ArticlesService } from '../services/articles.service';
import { CommentsService } from '../services/comments.service';
import { RejectsService } from '../services/rejects.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  constructor(private articlesService: ArticlesService,
    private commentsService: CommentsService,
    private rejectsService: RejectsService,
    private toastr: ToastrService) { }

  viewSelector = 'articles';
  articles: Article[] = [];
  articlesHof: Article[] = [];
  comments: Comment[] = [];
  rejectedArticles: RejectArticle[] = [];
  rejects = [];
  waitingArticles: Article[] = [];

  showModal = false;

  showEditModal(index) {
    this.rejectedArticles[index].showModal = true;
  }
  closeEditModal(index) {
    this.rejectedArticles[index].showModal = false;
  }
  removeFromArray(index) {
    this.rejectedArticles.splice(index, 1);
  }
  deleteArticle(index) { /// for implementation or not !!!
    console.log(index);
  }
  ngOnInit() {
    this.articlesService.getUserArticles('ACCEPTED_HOF').subscribe(
      (res) => {
        this.articlesHof.push(...res);
      },
      (err) => {
        this.toastr.error('Server Error!');
      }
    );
    this.articlesService.getUserArticles('ACCEPTED').subscribe(
      (res) => {
        this.articles.push(...res);
      },
      (err) => {
        this.toastr.error('Server Error!');
      }
    );
    this.articlesService.getUserArticles('PENDING').subscribe(
      (res) => {
        this.waitingArticles = res;
      },
      (err) => {
        this.toastr.error('Server Error!');
      }
    );
    this.rejectsService.getUserRejectArticles().subscribe(
      (res) => {
        this.rejectedArticles = res;
        this.rejectedArticles.forEach(element => {
          this.rejectsService.getRejectsByArticleId(element.article.id)
            .subscribe(
              (response) => {
                element.rejectInfo = response;
              },
              (err) => this.toastr.error('Server Error!')
            );
        });
      },
      (err) => {
        this.toastr.error('Server Error!');
      }
    );
    this.commentsService.getUserComments().subscribe(
      (res) => {
        this.comments = res;
      },
      (err) => {
        this.toastr.error('Server Error!');
      }
    );
  }

  viewSelectorChange(selector) {
    this.viewSelector = selector;
  }
}
