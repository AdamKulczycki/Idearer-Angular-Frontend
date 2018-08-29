import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleDetailComponent } from './articles/article-item/article-detail/article-detail.component';
import { ArticlesComponent } from './articles/articles.component';

const appRoutes: Routes = [
    { path: '', component: ArticlesComponent },
    { path: 'ugabuga', component: ArticleDetailComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}
