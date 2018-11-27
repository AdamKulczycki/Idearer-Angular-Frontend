import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleDetailComponent } from './articles/article-item/article-detail/article-detail.component';
import { ArticlesComponent } from './articles/articles.component';
import { LoginComponent } from './login/login.component';
import { ArticleFormComponent } from './articles/article-form/article-form.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ReportsPanelComponent } from './reports-panel/reports-panel.component';
import { ReportModalComponent } from './modals/report-modal/report-modal.component';
import { LoginGuard } from './services/login-guard.service';

const appRoutes: Routes = [
    { path: '', redirectTo: '/articles', pathMatch: 'full' },
    { path: 'articles', component: ArticlesComponent },
    { path: 'articles/:id', component: ArticleDetailComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'create', canActivate: [LoginGuard], component: ArticleFormComponent },
    { path: 'profile', canActivate: [LoginGuard], component: ProfileComponent },
    { path: 'admin', component: AdminPanelComponent },
    { path: 'reports', component: ReportsPanelComponent },
    { path: 'modal', component: ReportModalComponent },
    { path: '**', redirectTo: '/articles'},
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, { anchorScrolling: 'enabled', scrollPositionRestoration: 'top'})],
    exports: [RouterModule]
})

export class AppRoutingModule {

}
