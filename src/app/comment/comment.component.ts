import { Component, OnInit, Input } from '@angular/core';
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
  constructor(private commentsService: CommentsService, private storageService: StorageService) { }

  answerClicked = false;
  answerVisibility() {
    this.answerClicked = !this.answerClicked;
  }

  submitComment(text) {
    console.log(text);
    const payload = {
      article: {
        id: this.articleId
      },
      content: text,
      parentComment: {
        id: this.comment.id
      }
    };

    this.commentsService.makeComment(payload)
    .subscribe(
      (comment) => {
        const commentItem = comment;
        commentItem.user.username = this.storageService.get('username');
        this.comment.comments.push(commentItem);
        this.answerClicked = false;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  ngOnInit() {
  }

}
