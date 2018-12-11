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
import { CompareValidatorDirective } from './shared/compare-validator.directive';
import { CommentsService } from './services/comments.service';
import { LikesService } from './services/likes.service';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ReportsPanelComponent } from './reports-panel/reports-panel.component';
import { ReportModalComponent } from './modals/report-modal/report-modal.component';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { ScrollService } from './services/scroll.service';
import { LoginGuard } from './services/login-guard.service';
import { ReportsService } from './services/reports.service';

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
    CompareValidatorDirective,
    AdminPanelComponent,
    ReportsPanelComponent,
    ReportModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ScrollToModule.forRoot()
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
    ReportsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
