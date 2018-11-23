import { Injectable } from '@angular/core';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';

@Injectable()
export class ScrollService {

  constructor(private _scrollToService: ScrollToService) { }

  public triggerScrollTo(targetScroll) {
    const config: ScrollToConfigOptions = {
      target: 'comment-' + targetScroll
    };

    this._scrollToService.scrollTo(config);
  }
}
