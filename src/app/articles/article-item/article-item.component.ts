import { Component, OnInit, Input } from '@angular/core';
import { Article } from './../../models/article-model';
import { DomSanitizer } from '@angular/platform-browser';
import { User } from '../../models/user-model';
import { LikesService } from '../../services/likes.service';

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

  @Input()
    set article(article: Article) {
        for (const property in this._article) {
          if (article[property] !== this._article[property]) {
            this._article[property] = article[property];
          }
        }
    }
  get article(): Article {
    //console.log(this._article); /// PRZEJRZYJ TO!
    return this._article;
  }


  constructor(private sanitizer: DomSanitizer, private likesService: LikesService) {
    // this.safeURL = sanitizer.bypassSecurityTrustResourceUrl(this.article.content);
 }

  ngOnInit() {
  }

  addLike() {
    const payload = {
      articleId: this._article.id,
      liked: true
    };
    console.log(payload);
    this.likesService.articleLike(payload)
    .subscribe(
      (res) => {
        console.log(res);
        alert('zalajkowales!');
        this.article.liked = true;
        this.article.likesCount ++;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  dislike() {
    this.article.liked = false;
    this.article.likesCount --;
    alert('odlajkowales!');
  }
}
