import { Component, OnInit } from '@angular/core';
import { Article } from '../models/article-model';
import { ArticlesService } from '../services/articles.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Response } from '@angular/http';
import { User } from '../models/user-model';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  constructor(private articleService: ArticlesService, private route: ActivatedRoute) {}
  articles: Article[] = [];
  category = '';

  ngOnInit() {
    this.route.queryParams.subscribe( (params: Params) => {
      if ( params['category']) {
        this.category = params['category'];
        this.articleService.getArtcilesByCategory(this.category)
          .subscribe(
            (articles) => {
              this.articles = articles;
              console.log(articles);
            },
            (error) => console.log(error)
          );
      } else {
        this.articleService.getArticles()
        .subscribe(
          (articles) => {
            this.articles = articles;
          },
          (error) => console.log(error)
        );
      }
    });
  }

}
