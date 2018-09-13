import { Component, OnInit, Input } from '@angular/core';
import { Article } from './../../models/article-model';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-article-item',
  templateUrl: './article-item.component.html',
  styleUrls: ['./article-item.component.scss']
})
export class ArticleItemComponent implements OnInit {

  @Input() article: Article;
  safeURL;

  constructor(private sanitizer: DomSanitizer) {
    // this.safeURL = sanitizer.bypassSecurityTrustResourceUrl(this.article.content);
 }

  ngOnInit() {
    this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.article.content);
  }

  addLike() {
    this.article.likesCount ++;
  }

  private prettifyDate(input: string) : string{
    let date : Date = new Date(input);
    let options: Intl.DateTimeFormatOptions = {
      day: "numeric", month: "numeric", year: "numeric",
      hour: "2-digit", minute: "2-digit"
  };

  return date.toLocaleDateString("pl-PL", options);
  }

}
