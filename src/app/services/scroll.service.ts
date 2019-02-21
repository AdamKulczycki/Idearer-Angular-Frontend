import { Injectable } from '@angular/core';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';

@Injectable()
export class ScrollService {

  constructor(private _scrollToService: ScrollToService) { }

  public triggerScrollTo(targetScroll) {
    console.log(targetScroll);
    const config: ScrollToConfigOptions = {
      easing: 'easeOutElastic',
      target: targetScroll,
      offset: 500
    };

    this._scrollToService.scrollTo(config);
  }
}
