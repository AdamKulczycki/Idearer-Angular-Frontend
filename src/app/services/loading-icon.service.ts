import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class LoadingIconService {

    public $isLoadingActive = new BehaviorSubject<boolean>(false);

    public setLoading(status: boolean): void {
        console.log(this.$isLoadingActive.value, status);
        this.$isLoadingActive.next(status);
    }
}
