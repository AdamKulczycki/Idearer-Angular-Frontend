import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading-icon',
  templateUrl: './loading-icon.component.html',
  styleUrls: ['./loading-icon.component.scss']
})
export class LoadingIconComponent implements OnInit {

  public show: boolean = false;

  constructor() { }

  ngOnInit() {
    // we dont want to display loading icon immediately after http request
    // this would result to display icon for nanoseconds after every request
    setTimeout(() => {
      this.show = true;
    }, 1000);
  }

}
