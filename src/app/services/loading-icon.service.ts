import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class LoadingIconService {

    public $isLoadingActive = new BehaviorSubject<boolean>(false);

    public setLoading(status: boolean): void {
        this.$isLoadingActive.next(status);
    }
}
