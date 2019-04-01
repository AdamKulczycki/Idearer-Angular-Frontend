import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleDetailComponent } from './articles/article-item/article-detail/article-detail.component';
import { ArticlesComponent } from './articles/articles.component';
import { LoginComponent } from './login/login.component';
import { ArticleFormComponent } from './articles/article-form/article-form.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { LoginGuard } from './services/login-guard.service';
import { ArticleEditModalComponent } from './modals/article-edit-modal/article-edit-modal.component';
import { AdminGuard } from './services/admin-guard.service';
import { ReportsResolver } from './services/reports.resolve';

const appRoutes: Routes = [
    { path: '', redirectTo: 'articles', pathMatch: 'full' },
    { path: 'articles', component: ArticlesComponent },
    { path: 'articles/:id', component: ArticleDetailComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'create', canActivate: [LoginGuard], component: ArticleFormComponent },
    { path: 'profile', canActivate: [LoginGuard], component: ProfileComponent },
    { path: 'admin', canActivate: [LoginGuard, AdminGuard], component: AdminPanelComponent, resolve:  { test: ReportsResolver } },
    { path: 'modal', component: ArticleEditModalComponent },
    { path: '**', redirectTo: 'articles'},
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}
