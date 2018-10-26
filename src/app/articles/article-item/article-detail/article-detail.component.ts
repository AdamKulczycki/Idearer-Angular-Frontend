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
      console.log(this.id);
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


 /*  [new Comment(1, 'Babciu, to jest zajebiste!', '20/08/2018', 3312, 'wnusio', [new Comment(99, 'super', '20/08/2018', 231, 'babcia', [new Comment(1, 'tez sie ciesze babciu', '20/08/2018', 11, 'wnusio', [])]), new Comment(1, 'tez sie ciesze babciu', '20/08/2018', 11, 'wnusio', [])]),
  new Comment(2, 'Genialny przepis na ramen', '23/08/2018', 12, 'kucharczyk', []),
  new Comment(3, 'Skipnalem te czesc o gotowaniu i od razu przeszedlem do kapieli, swietnie dziala na skore. Polecam Skipnalem te czesc o gotowaniu i od razu przeszedlem do kapieli, swietnie dziala na skore. Polecam', '29/08/2018', 33, 'spa', []),
  new Comment(4, 'Ja za to sie wykapalem a potem zjadlem ten makaron, smakowal jeszcze lepiej', '18/07/2018', 4341232, 'smakosz', []),
  new Comment(5, 'co za debil', '01/07/2018', 0, 'krytyk', []),
  new Comment(6, 'tyle zmarnowanego makaronu, a dzieci w afryce gloduja', '24/08/2018', 2, 'zniesmaczona', []),
]; */

  ngOnInit() {
    this.router.events.subscribe(() => { // przenosi na gore strony po wczytaniu artykulu
      window.scrollTo(0, 0);
    });
  }

}

