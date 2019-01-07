import { Component, OnInit } from '@angular/core';
import { Article } from '../models/article-model';
import { User } from '../models/user-model';
import { Category } from '../models/category-model';
import { ArticlesService } from '../services/articles.service';
import { RejectsService } from '../services/rejects.service';
import { ReportsService } from '../services/reports.service';
import { Report } from '../models/report-model';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  constructor(private articlesService: ArticlesService,
    private rejectsService: RejectsService,
    private reportsService: ReportsService) { }

  viewSelector = 'articles';
  articles = [];
  reportsArray = [];
  reportsNumber = 0;

  onSubmit(f, id) {
    if (!f.value.reason) {
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
        this.rejectsService.rejectArticle(id, f.value.reason)
          .subscribe(
            res => console.log(res),
            err => console.log(err)
          );
      } else {
        this.rejectsService.rejectArticle(id, f.value.otherReason)
          .subscribe(
            res => console.log(res),
            err => console.log(err)
          );
      }
    }
  }
  viewSelectorChange(value) {
    this.viewSelector = value;
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

    this.reportsService.getIdsOfReportedArticles()
      .subscribe(
        (res: Array<number>) => {
          res.forEach(id => {
            this.reportsService.getReportsByArticleId(id)
              .subscribe(
                (reports: Report[]) => {
                  this.reportsArray.push({
                    articleId: id,
                    articleReports: reports
                  });
                  this.reportsNumber += reports.length;
                },
                (err) => console.log(err)
              );
          });
        },
        (err) => console.log(err)
      );
  }

}
