import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ReportsService } from 'src/app/services/reports.service';

@Component({
  selector: 'app-report-modal',
  templateUrl: './report-modal.component.html',
  styleUrls: ['./report-modal.component.scss']
})
export class ReportModalComponent implements OnInit {

  @Output() closeModal: EventEmitter<any> = new EventEmitter();
  @Input() articleId: number;
  constructor(private reportsSerivce: ReportsService) {}

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
    console.log(payload);
    this.reportsSerivce.reportArticle(payload)
      .subscribe(
        res => {
          console.log(res);
          this.closeModal.emit();
        },
        err => console.log(err)
      );
  }

}
