import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleEditModalComponent } from './article-edit-modal.component';

describe('ArticleEditModalComponent', () => {
  let component: ArticleEditModalComponent;
  let fixture: ComponentFixture<ArticleEditModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleEditModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
