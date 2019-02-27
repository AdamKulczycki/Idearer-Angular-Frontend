import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Article } from '../../../models/article-model';
import { Comment } from '../../../models/comment-model';
import { ArticlesService } from '../../../services/articles.service';
import { CommentsService } from '../../../services/comments.service';
import { StorageService } from '../../../services/storage.service';
import { ScrollService } from 'src/app/services/scroll.service';
import { ToastrService } from 'ngx-toastr';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit, AfterViewInit {
  @ViewChild('f') formComment: NgForm;

  public id: number;
  public article: Article;
  public comments: Comment[] = [];

  constructor(private route: ActivatedRoute,
    private articlesService: ArticlesService,
    private commentsService: CommentsService,
    private storageService: StorageService,
    private scrollService: ScrollService,
    private toastr: ToastrService) {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
    });
    this.articlesService.getArticle(this.id)
      .subscribe(
        (article) => {
          this.article = article;
        },
        (err) => this.toastr.error('Server Error!')
      );
    this.commentsService.getComments(this.id)
      .subscribe(
        (comments) => {
          this.comments = comments;
        },
        (err) => this.toastr.error('Server Error!')
    );
  }

  submitComment(form): void {
    const payload = {
      article: {
        id: this.article.id
      },
      content: form.value.comment
    };

    this.commentsService.makeComment(payload)
    .subscribe(
      (comment) => {
        const commentItem = comment;
        commentItem.user.username = this.storageService.get('username');
        this.comments.push(commentItem);
        this.formComment.controls.comment.reset();
        this.toastr.success('Comment created!', 'Success!');
      },
      (err) => {
        if (err.code === 401) {
          this.toastr.error('You have to be Log In to write comments!');
        } else {
          this.toastr.error(err.error.error);
        }
      }
    );
  }

  ngAfterViewInit() {
    setTimeout(() => { /// delete this or improve
      this.route.queryParams.subscribe((params: Params) => {
        if (params['ScrollTo']) {
          this.scrollService.triggerScrollTo(params['ScrollTo']);
        }
        });
    }, 2000);
  }
  ngOnInit() {
  }

}

