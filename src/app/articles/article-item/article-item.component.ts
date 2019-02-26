import { Component, OnInit, Input } from '@angular/core';
import { Article } from './../../models/article-model';
import { LikesService } from '../../services/likes.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-article-item',
  templateUrl: './article-item.component.html',
  styleUrls: ['./article-item.component.scss']
})
export class ArticleItemComponent implements OnInit {

  public _article = new Article({
    id: undefined,
    title: undefined,
    content: undefined,
    created: undefined,
    likesCount: undefined,
    user: undefined,
    category: undefined,
    liked: undefined,
    commentsCount: undefined
  });

  showModal = false;

  showReportModal() {
    this.showModal = true;
  }
  closeReportModal() {
    this.showModal = false;
  }

  @Input()
    set article(article: Article) {
        for (const property in this._article) {
          if (article[property] !== this._article[property]) {
            this._article[property] = article[property];
          }
        }
    }
  get article(): Article {
    return this._article;
  }


  constructor(private likesService: LikesService, private toastr: ToastrService) {
 }

  ngOnInit() {
  }

  changeLike(liked) {
    const payload = {
      articleId: this._article.id,
      liked: liked
    };
    this.likesService.articleChangeLike(payload)
    .subscribe(
      (res) => {
        if (payload.liked) {
          this.article.likesCount ++;
          this.toastr.success('You liked article!', 'Liked!');
        } else {
          this.article.likesCount --;
          this.toastr.success('You unliked article!', 'Unliked!');
        }
        this.article.liked = payload.liked;
      },
      (err) => {
        if (err.code === 401) {
          this.toastr.error('You have to be Log In to give likes!');
        } else {
          this.toastr.error(err.error.error);
        }
      }
    );
  }
}
