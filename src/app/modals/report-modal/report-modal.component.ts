import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ReportsService } from 'src/app/services/reports.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-report-modal',
  templateUrl: './report-modal.component.html',
  styleUrls: ['./report-modal.component.scss']
})
export class ReportModalComponent implements OnInit {

  @Output() closeModal: EventEmitter<any> = new EventEmitter();
  @Input() articleId: number;
  constructor(private reportsSerivce: ReportsService, private toastr: ToastrService) {}

  ngOnInit() {}

  close() {
    this.closeModal.emit();
  }

  stop(event) {
    event.stopPropagation();
  }

  onSubmit(f) {
    const payload = {
      id: this.articleId,
      description: f.value.reportReason
    };
    this.reportsSerivce.reportArticle(payload)
      .subscribe(
        res => {
          this.toastr.success('Report sended!', 'Success!');
          this.closeModal.emit();
        },
        err => {
          if (err.code === 401) {
            this.toastr.error('You have to be Log In to report article!');
          } else {
            this.toastr.error(err.error.error);
          }
        }
      );
  }

}
