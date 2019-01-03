import { Component, OnInit } from '@angular/core';
import { Article } from '../models/article-model';
import { User } from '../models/user-model';
import { Category } from '../models/category-model';
import { ArticlesService } from '../services/articles.service';
import { RejectsService } from '../services/rejects.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  constructor(private articlesService: ArticlesService, private rejectsService: RejectsService) { }

  articles = [];

  /// polaczenie z serwerem
  onSubmit(f, id) {
    if (!f.value.reason) {
      /// zaakceptuj
      const payload = {
        status: 'ACCEPTED'
      };
      this.articlesService.patchArticle(id, payload)
        .subscribe(
          res => console.log(res),
          err => console.log(err)
        );
    } else {
      if (!f.value.otherReason) {
        /// odrzuc z predefiniowanym powodem
        this.rejectsService.rejectArticle(id, f.value.reason)
          .subscribe(
            res => console.log(res),
            err => console.log(err)
          );
        console.log('rejected: ' + f.value.reason);
      } else {
        /// odrzuc z napisanym powodem
        this.rejectsService.rejectArticle(id, f.value.otherReason)
          .subscribe(
            res => console.log(res),
            err => console.log(err)
          );
        console.log('rejected: ' + f.value.otherReason);
      }
    }
  }
  ngOnInit() {
    this.articlesService.getPendingArtciles()
    .subscribe(
      (res) => {
        this.articles = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
