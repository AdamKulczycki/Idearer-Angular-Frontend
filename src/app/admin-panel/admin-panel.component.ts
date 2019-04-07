import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../services/articles.service';
import { RejectsService } from '../services/rejects.service';
import { ReportsService } from '../services/reports.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { Article } from '../models/article-model';


@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  public viewSelector: string = 'articles';
  public articles: Array<Article> = [];
  public reportsArray: Array<any> = [];

  constructor(private articlesService: ArticlesService,
    private rejectsService: RejectsService,
    private reportsService: ReportsService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute) {

    this.articlesService.getPendingArtciles()
      .subscribe(
        (res) => {
          this.articles = res;
        },
        (err) => {
          this.toastr.error('Server Error!');
        }
      );

    this.reportsArray = this.activatedRoute.snapshot.data['reports'];
    }

  onSubmit(f, id): void {
    const index = this.articles.map(e => e.id).indexOf(id);
    if (!f.value.reason) {
      const payload = {
        status: 'ACCEPTED'
      };
      this.articlesService.patchArticle(id, payload)
        .subscribe(
          (res) => {
            this.toastr.success('Status changed!', 'Success!');
            this.articles.splice(index, 1);
          },
          (err) => {
            this.toastr.error('Server Error!');
          }
        );
    } else {
      if (!f.value.otherReason) {
        this.rejectsService.rejectArticle(id, f.value.reason)
          .subscribe(
            (res) => {
              this.toastr.success('Status changed!', 'Success!');
              this.articles.splice(index, 1);
            },
            (err) => {
              this.toastr.error('Server Error!');
            }
          );
      } else {
        this.rejectsService.rejectArticle(id, f.value.otherReason)
          .subscribe(
            (res) => {
              this.toastr.success('Status changed!', 'Success!');
              this.articles.splice(index, 1);
            },
            (err) => {
              this.toastr.error('Server Error!');
            }
          );
      }
    }
  }
  onSubmitFromReportsPanel(f, index): void { // manage reports
    const id = this.reportsArray[index].id;
    if (!f.value.otherReason) {
      this.rejectsService.rejectArticle(id, f.value.reason)
        .subscribe(
          (res) => {
          this.toastr.success('Report accepted!', 'Success!');
          this.reportsArray.splice(index, 1);
          },
          (err) => {
            this.toastr.error('Server Error!');
          }
        );
    } else {
      this.rejectsService.rejectArticle(id, f.value.otherReason)
        .subscribe(
          (res) => {
          this.toastr.success('Report accepted!', 'Success!');
          this.reportsArray.splice(index, 1);
          },
          (err) => {
            this.toastr.error('Server Error!');
          }
        );
    }
  }
  viewSelectorChange(value): void {
    this.viewSelector = value;
  }
  viewArticleChange(index): void {
    this.reportsArray[index].showArticle = !this.reportsArray[index].showArticle;
  }
  deleteArticleReports(articleId, index): void {
    this.reportsService.deleteArticleReports(articleId)
      .subscribe(
        (res) => {
          this.toastr.success('Reports Rejected!');
          this.reportsArray[index].confirmModalShow = false;
          this.reportsArray.splice(index, 1);
        },
        (err) => {
          this.toastr.error('Server Error!');
        }
      );
  }
  ngOnInit() {

  }

}
