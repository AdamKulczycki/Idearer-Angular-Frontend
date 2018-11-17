import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-report-modal',
  templateUrl: './report-modal.component.html',
  styleUrls: ['./report-modal.component.scss']
})
export class ReportModalComponent implements OnInit {

  @Output() closeModal: EventEmitter<any> = new EventEmitter();
  @Input() articleId: number;
  constructor() {}

  ngOnInit() {}

  close() {
    this.closeModal.emit();
  }

  stop(event) {
    event.stopPropagation();
  }

  onSubmit(f) {
    console.log('id: ' + this.articleId);
    console.log('reason: ' + f.value.reportReason);
  }

}
