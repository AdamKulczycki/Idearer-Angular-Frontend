import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Article } from 'src/app/models/article-model';
import { CategoriesService } from 'src/app/services/categories.service';
import { ArticlesService } from 'src/app/services/articles.service';
import { Category } from 'src/app/models/category-model';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-article-edit-modal',
  templateUrl: './article-edit-modal.component.html',
  styleUrls: ['./article-edit-modal.component.scss']
})
export class ArticleEditModalComponent implements OnInit {

  @Output() closeModal: EventEmitter<any> = new EventEmitter();
  @Output() removeArticleFromArray: EventEmitter<any> = new EventEmitter();
  @Input() article: Article;
  categories: Category[];
  contentPlaceholder;
  categoryPlaceholder;
  constructor(private categoriesService: CategoriesService, private articlesService: ArticlesService, private toastr: ToastrService) {
    this.categoriesService.getCategories()
      .subscribe(
        (categories) => {
          this.categories = categories;
          this.categoryPlaceholder = this.article.category.id - 1;
        },
        (err) => this.toastr.error('Server Error!')
      );
   }

  onSubmit(f) {
    this.article.title = f.value.userData.title;
    this.article.category = this.categories[f.value.userData.category];
    this.article.content = f.value.userData.content.match(/^[\s\S]*watch\?v=([\s\S]{11})$/)[1];
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
        this.removeArticleFromArray.emit();
        this.closeModal.emit();
        this.toastr.success('Article changed!', 'Success!');
      },
      (err) => {
        this.toastr.error('Server Error!');
      }
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
