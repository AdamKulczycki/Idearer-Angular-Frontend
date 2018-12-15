import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Article } from 'src/app/models/article-model';
import { CategoriesService } from 'src/app/services/categories.service';
import { ArticlesService } from 'src/app/services/articles.service';
import { Category } from 'src/app/models/category-model';

@Component({
  selector: 'app-article-edit-modal',
  templateUrl: './article-edit-modal.component.html',
  styleUrls: ['./article-edit-modal.component.scss']
})
export class ArticleEditModalComponent implements OnInit {

  @Output() closeModal: EventEmitter<any> = new EventEmitter();
  // @Output() closeModalandEditedArticle: EventEmitter<any> = new EventEmitter();
  @Input() article: Article;
  categories: Category[];
  contentPlaceholder;
  categoryPlaceholder;
  constructor(private categoriesService: CategoriesService, private articlesService: ArticlesService) {
    this.categoriesService.getCategories()
      .subscribe(
        (categories) => {
          this.categories = categories;
          console.log(categories);
          this.categoryPlaceholder = this.article.category.id - 1;
        },
        (error) => console.log(error)
      );
   }

  onSubmit(f) {
    this.article.title = f.value.userData.title;
    this.article.category = this.categories[f.value.userData.category];
    this.article.content = f.value.userData.content.match(/^[\s\S]*watch\?v=([\s\S]{11})$/)[1];
    console.log(this.article);
    const payload = {
      category: {
        id: this.article.category.id
      },
      content: this.article.content,
      title: this.article.title,
      status: 'PENDING'
    };

    this.articlesService.patchArticle(this.article.id, payload).subscribe(
      (res) => {
        console.log(res);
        this.closeModal.emit();
      },
      (err) => console.log(err)
    );
  }

  close() {
    this.closeModal.emit();
  }
  stop(event) {
    event.stopPropagation();
  }
  ngOnInit() {
    this.contentPlaceholder = 'https://www.youtube.com/watch?v=' + this.article.content;
  }

}
