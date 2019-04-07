import { Resolve } from '@angular/router';
import { ReportsService } from './reports.service';
import { Injectable } from '@angular/core';

@Injectable()
export class ReportsResolver implements Resolve<any> {
    constructor(private reportsService: ReportsService) {}

    resolve() {
        return this.reportsService.getReports();
    }
}
