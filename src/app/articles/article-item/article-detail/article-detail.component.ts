import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Article } from '../../../models/article-model';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.scss']
})
export class ArticleDetailComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  id: number;
  article = new Article(1, 'Ramen', 'https://www.youtube.com/embed/B8y3SSmz4sg', '10/01/2018', 201, 'Admin', 'Kitchen');

  ngOnInit() {
    this.route.params.subscribe( (params: Params) => {
      this.id = params['id'];
    });
  }

}
