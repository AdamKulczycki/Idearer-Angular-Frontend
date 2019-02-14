import { Resolve } from '@angular/router';
import { ReportsService } from './reports.service';
import { Injectable } from '@angular/core';

@Injectable()
export class ReportsResolver implements Resolve<any> {
    constructor(private reportsService: ReportsService) {}

    resolve() {
        console.log('resolve')
        console.log(this.reportsService.test())
        return this.reportsService.test();
    }
}
