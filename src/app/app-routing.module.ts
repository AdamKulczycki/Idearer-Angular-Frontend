import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleDetailComponent } from './articles/article-item/article-detail/article-detail.component';
import { ArticlesComponent } from './articles/articles.component';

const appRoutes: Routes = [
    { path: '', redirectTo: '/articles', pathMatch: 'full' },
<<<<<<< HEAD
    { path: 'articles', component: ArticlesComponent},
=======
    { path: 'articles', component: ArticlesComponent },
>>>>>>> 4863c607aaff25a16babceb34d969a941e51404c
    { path: 'articles/:id', component: ArticleDetailComponent },
    { path: '**', redirectTo: '/articles'}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}
