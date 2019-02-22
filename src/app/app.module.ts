import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ArticlesComponent } from './articles/articles.component';
import { ArticleItemComponent } from './articles/article-item/article-item.component';
import { ArticleDetailComponent } from './articles/article-item/article-detail/article-detail.component';
import { AppRoutingModule } from './app-routing.module';
import { ArticlesService } from './services/articles.service';
import { LoginComponent } from './login/login.component';
import { CommentComponent } from './comment/comment.component';
import { HttpClientModule } from '@angular/common/http';
import { ArticleFormComponent } from './articles/article-form/article-form.component';
import { FormsModule } from '@angular/forms';
import { CategoriesService } from './services/categories.service';
import { RegisterComponent } from './register/register.component';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { AuthService } from './services/auth.service';
import { StorageService } from './services/storage.service';
import { ProfileComponent } from './profile/profile.component';
import { CommentsService } from './services/comments.service';
import { LikesService } from './services/likes.service';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ReportsPanelComponent } from './reports-panel/reports-panel.component';
import { ReportModalComponent } from './modals/report-modal/report-modal.component';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { ScrollService } from './services/scroll.service';
import { LoginGuard } from './services/login-guard.service';
import { ReportsService } from './services/reports.service';
import { ArticleEditModalComponent } from './modals/article-edit-modal/article-edit-modal.component';
import { RejectsService } from './services/rejects.service';
import { AdminGuard } from './services/admin-guard.service';
import { AdminService } from './services/admin.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ReportsResolver } from './services/reports.resolve';

import {MatButtonModule, MatCheckboxModule} from '@angular/material'; // angular material
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ArticlesComponent,
    ArticleItemComponent,
    ArticleDetailComponent,
    LoginComponent,
    CommentComponent,
    ArticleFormComponent,
    RegisterComponent,
    SafeUrlPipe,
    ProfileComponent,
    AdminPanelComponent,
    ReportsPanelComponent,
    ReportModalComponent,
    ArticleEditModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ScrollToModule.forRoot(),
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-bottom-center',
      progressBar: true
    }), // ToastrModule added
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule
  ],
  providers: [
    ArticlesService,
    CategoriesService,
    AuthService,
    StorageService,
    CommentsService,
    LikesService,
    ScrollService,
    LoginGuard,
    AdminGuard,
    ReportsService,
    RejectsService,
    AdminService,
    ReportsResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
