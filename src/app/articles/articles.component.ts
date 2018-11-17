import { Component, OnInit } from '@angular/core';
import { Article } from '../models/article-model';
import { ArticlesService } from '../services/articles.service';
import { ActivatedRoute, Params } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

  constructor(private articleService: ArticlesService, private route: ActivatedRoute, private storageSrv: StorageService, private authSrv: AuthService) {

    this.authSrv.isLogged.subscribe( value => {
      this.isLogged = value;
    });
  }

  articles: Article[] = [];
  category = '';
  isLogged: boolean;

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
