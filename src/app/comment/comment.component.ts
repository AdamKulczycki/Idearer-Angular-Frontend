import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Comment } from '../models/comment-model';
import { CommentsService } from '../services/comments.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input() comment: Comment;
  @Input() articleId: number;
  @ViewChild('f') Articleform: NgForm;
  constructor(private commentsService: CommentsService, private storageService: StorageService) { }

  answerClicked = false;
  answerVisibility() {
    this.answerClicked = !this.answerClicked;
  }

  submitComment(text) {
    console.log(text.value.comment);
    // const payload = {
    //   article: {
    //     id: this.articleId
    //   },
    //   content: text,
    //   parentComment: {
    //     id: this.comment.id
    //   }
    // };

    // this.commentsService.makeComment(payload)
    // .subscribe(
    //   (comment) => {
    //     const commentItem = comment;
    //     commentItem.user.username = this.storageService.get('username');
    //     this.comment.comments.push(commentItem);
    //     this.answerClicked = false;
    //   },
    //   (err) => {
    //     console.log(err);
    //   }
    // );
  }
  ngOnInit() {
  }

}
