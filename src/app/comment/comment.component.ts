import { Component, OnInit, Input } from '@angular/core';
import { Comment } from '../models/comment-model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input() comment: Comment;
  constructor() { }

  answerClicked = false;
  answerVisibility() {
    this.answerClicked = !this.answerClicked;
  }
  ngOnInit() {
  }

}
