import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Article } from '../../../models/article-model';
import { Comment } from '../../../models/comment-model';
import { ArticlesService } from '../../../services/articles.service';
import { CommentsService } from '../../../services/comments.service';
import { StorageService } from '../../../services/storage.service';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit {

  id: number;
  article: Article;
  comments: Comment[] = [];

  constructor(private router: Router, private route: ActivatedRoute,
    private articlesService: ArticlesService,
    private commentsService: CommentsService,
    private storageService: StorageService) {
    this.route.params.subscribe( (params: Params) => {
      this.id = params['id'];
    });
    this.articlesService.getArticle(this.id)
      .subscribe(
        (article) => {
          this.article = article;
        },
        (error) => console.log(error)
      );
    this.commentsService.getComments(this.id)
      .subscribe(
        (comments) => {
          this.comments = comments;
        },
        (error) => console.log(error)
    );
  }
  answerClicked = false;
  answerVisibility() {
    this.answerClicked = !this.answerClicked;
  }

  submitComment(form) {
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
        this.answerClicked = false;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngOnInit() {
    // this.router.events.subscribe(() => { // przenosi na gore strony po wczytaniu artykulu
    //   window.scrollTo(0, 0);
    // });
  }

}

