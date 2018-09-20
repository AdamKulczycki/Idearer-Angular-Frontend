import { Component, OnInit, Input } from '@angular/core';
import { Article } from './../../models/article-model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-article-item',
  templateUrl: './article-item.component.html',
  styleUrls: ['./article-item.component.scss']
})
export class ArticleItemComponent implements OnInit {

  private _article: Article;
  safeURL;

  @Input()
    set article(article: Article) {
      this._article = article;
      if (this.article) {
      this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/' + this.article.content);
      }
      console.log('wywolalem sie');
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
