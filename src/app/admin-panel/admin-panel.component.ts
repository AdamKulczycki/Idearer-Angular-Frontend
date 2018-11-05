import { Component, OnInit } from '@angular/core';
import { Article } from '../models/article-model';
import { User } from '../models/user-model';
import { Category } from '../models/category-model';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {

  constructor() { }

  articles = [
    new Article(
      {
      id: 99,
      title: 'hello there general Kenobi',
      content: 'rEq1Z0bjdwc',
      created: new Date(),
      likesCount: 9999,
      user: new User({
        email: 'kenobi@gmail.com',
        id: 999,
        password: 'hello',
        username: 'General Kenobi'
      }),
      category: new Category({
        id: 9999,
        name: 'Star Wars'
      }),
      liked: false,
      commentsCount: 0
      }),
      new Article(
        {
        id: 200,
        title: 'hello there general Kenobi',
        content: 'rEq1Z0bjdwc',
        created: new Date(),
        likesCount: 9999,
        user: new User({
          email: 'kenobi@gmail.com',
          id: 999,
          password: 'hello',
          username: 'General Kenobi'
        }),
        category: new Category({
          id: 9999,
          name: 'Star Wars'
        }),
        liked: false,
        commentsCount: 0
        })
  ];

  /// polaczenie z serwerem
  onSubmit(f, id) {
    console.log(f.value.status);
    if (f.value.reason) {
      console.log(f.value.reason);
    }
    if (f.value.otherReason) {
      console.log(f.value.otherReason);
    }
    console.log(id);
  }
  ngOnInit() {
  }

}
