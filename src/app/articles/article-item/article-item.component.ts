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
  NumberOfComments = 41;

  constructor(private sanitizer: DomSanitizer) {
    // this.safeURL = sanitizer.bypassSecurityTrustResourceUrl(this.article.content);
 }

  ngOnInit() {
    this.safeURL = this.sanitizer.bypassSecurityTrustResourceUrl(this.article.content);
  }

  addLike() {
    this.article.likes ++;
  }

}
