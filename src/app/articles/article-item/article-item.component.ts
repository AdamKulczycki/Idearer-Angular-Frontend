import { Component, OnInit, Input } from '@angular/core';
import { Article } from './../../models/article-model';
import { DomSanitizer } from '@angular/platform-browser';
import { User } from '../../models/user-model';

@Component({
  selector: 'app-article-item',
  templateUrl: './article-item.component.html',
  styleUrls: ['./article-item.component.scss']
})
export class ArticleItemComponent implements OnInit {

  user = {
    email: 'test@test.pl',
    id: 1,
    password: 'test',
    username: 'admin'
  }

  private _article = new Article({
    id: undefined,
    title: 'Your title',
    content: undefined,
    created: new Date(),
    likesCount: 5,
    user: new User(this.user),
    category: undefined,
    liked: true,
    commentsCount: 0
  });
  safeURL;

  @Input()
    set article(article: Article) {
        /* if (article.content !== this._article.content) {
          this._article.content = article.content;
          this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + this._article.content);
        } */
        for (const property in this._article) {
          if (article[property] !== this._article[property]) {
            this._article[property] = article[property];
          }
        }
    }
  get article(): Article {
    return this._article;
  }


  constructor(private sanitizer: DomSanitizer) {
    // this.safeURL = sanitizer.bypassSecurityTrustResourceUrl(this.article.content);
 }

  ngOnInit() {
  }

  addLike() {
    this.article.likesCount ++;
  }
}
