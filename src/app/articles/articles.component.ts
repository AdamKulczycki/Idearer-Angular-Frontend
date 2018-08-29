import { Component, OnInit } from '@angular/core';
import { Article } from '../models/article-model';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  constructor() { }
  articles: Article[] = [new Article(1, 'ramen', 'https://www.youtube.com/embed/B8y3SSmz4sg', '10/01/2018', 201, 'Admin', 'Kitchen'),
  new Article(2, 'lol', 'https://www.youtube.com/embed/7kSPCWcs7cc', '10/01/2018', 201, 'chinkchiankchionk', 'Tools')];

  ngOnInit() {
  }

}