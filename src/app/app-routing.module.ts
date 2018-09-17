import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleDetailComponent } from './articles/article-item/article-detail/article-detail.component';
import { ArticlesComponent } from './articles/articles.component';
import { LoginComponent } from './login/login.component';
import { ArticleFormComponent } from './articles/article-form/article-form.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/articles', pathMatch: 'full' },
    { path: 'articles', component: ArticlesComponent },
    { path: 'articles/:id', component: ArticleDetailComponent },
    { path: 'login', component: LoginComponent },
    { path: 'create', component: ArticleFormComponent },
    { path: '**', redirectTo: '/articles'}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}
