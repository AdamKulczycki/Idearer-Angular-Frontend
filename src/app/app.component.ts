import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private authSvc: AuthService, private storageSvc: StorageService) {

    this.authSvc.setIsLogged(!!this.storageSvc.get('access_token'));
  }
}
