import { Component, OnInit } from '@angular/core';
import { Article } from '../models/article-model';
import { User } from '../models/user-model';
import { Category } from '../models/category-model';
import { ArticlesService } from '../services/articles.service';
import { RejectsService } from '../services/rejects.service';
import { ReportsService } from '../services/reports.service';
import { Report } from '../models/report-model';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  constructor(private articlesService: ArticlesService,
    private rejectsService: RejectsService,
    private reportsService: ReportsService,
    private toastr: ToastrService) {

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
            let article: Article;
            this.articlesService.getArticle(id)
              .subscribe(
                articleRes => article = articleRes,
                err => console.log(err)
                );
            this.reportsService.getReportsByArticleId(id)
              .subscribe(
                (reports: Report[]) => {
                  this.reportsArray.push({
                    articleObject: article,
                    showArticle: false,
                    showPanel: false,
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

  viewSelector = 'articles';
  articles = [];
  reportsArray = [];
  reportsNumber = 0;
  onSubmit(f, id) {
    console.log(f.value);
    const index = this.articles.map(e => e.id).indexOf(id);
    if (!f.value.reason) {
      const payload = {
        status: 'ACCEPTED'
      };
      this.articlesService.patchArticle(id, payload)
        .subscribe(
          res => {
            console.log(res);
            this.toastr.success('Status changed!', 'Success!');
            this.articles.splice(index, 1);
          },
          err => {
            console.log(err);
            this.toastr.error('Server Error!');
          }
        );
    } else {
      if (!f.value.otherReason) {
        this.rejectsService.rejectArticle(id, f.value.reason)
          .subscribe(
            res => {
              console.log(res);
              this.toastr.success('Status changed!', 'Success!');
              this.articles.splice(index, 1);
            },
            err => {
              console.log(err);
              this.toastr.error('Server Error!');
            }
          );
      } else {
        this.rejectsService.rejectArticle(id, f.value.otherReason)
          .subscribe(
            res => {
              console.log(res);
              this.toastr.success('Status changed!', 'Success!');
              this.articles.splice(index, 1);
            },
            err => {
              console.log(err);
              this.toastr.error('Server Error!');
            }
          );
      }
    }
  }
  onSubmitFromReportsPanel(f, id) { // manage reports
    const index = this.reportsArray.map(e => e.articleObject.id).indexOf(id);
    if (!f.value.otherReason) {
      this.rejectsService.rejectArticle(id, f.value.reason)
        .subscribe(
          res => {
          console.log(res);
          this.toastr.success('Report accepted!', 'Success!');
          this.reportsNumber -= this.reportsArray[index].articleReports.length;
          this.reportsArray.splice(index, 1);
          },
          err => {
            console.log(err);
            this.toastr.error('Server Error!');
          }
        );
    } else {
      this.rejectsService.rejectArticle(id, f.value.otherReason)
        .subscribe(
          res => {
          console.log(res);
          this.toastr.success('Report accepted!', 'Success!');
          this.reportsNumber -= this.reportsArray[index].articleReports.length;
          this.reportsArray.splice(index, 1);
          },
          err => {
            console.log(err);
            this.toastr.error('Server Error!');
          }
        );
    }
  }
  viewSelectorChange(value) {
    this.viewSelector = value;
  }
  viewArticleChange(index) {
    this.reportsArray[index].showArticle = !this.reportsArray[index].showArticle;
    console.log(this.reportsArray);
  }
  deleteAllreports(index) {
    const numberOfReports = this.reportsArray[index].articleReports.length;
    let reportsDeleted = 0;
    this.reportsArray[index].articleReports.forEach(element => {
      this.reportsService.deleteReport(element.id)
        .subscribe(
          res => {
            console.log(res);
            this.toastr.success('Report deleted!', 'Success!');
            reportsDeleted ++;
            if (numberOfReports === reportsDeleted) {
              console.log('All reports was deleted');
              this.reportsNumber -= this.reportsArray[index].articleReports.length;
              this.reportsArray.splice(index, 1);
            }
          },
          err => {
            console.log(err);
            this.toastr.error('Server Error!');
          }
        );
    });
  }
  ngOnInit() {

  }

}
