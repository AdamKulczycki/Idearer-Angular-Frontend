import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-report-modal',
  templateUrl: './report-modal.component.html',
  styleUrls: ['./report-modal.component.scss']
})
export class ReportModalComponent implements OnInit {

  // @Input() display = true;
  display = true;
  constructor() {
  }

  ngOnInit() {
  }

  close() {
    console.log('click');
    this.display = false;
  }

  stop(event) {
    console.log('stop click');
    event.stopPropagation();
  }

}
