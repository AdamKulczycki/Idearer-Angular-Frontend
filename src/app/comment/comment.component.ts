import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Comment } from '../models/comment-model';
import { CommentsService } from '../services/comments.service';
import { StorageService } from '../services/storage.service';
import { LikesService } from '../services/likes.service';
import { ScrollService } from '../services/scroll.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  @Input() mainComment: boolean;
  @Input() parentCommentAuthor: string;
  @Input() parentCommentId: string;
  @Input() comment: Comment;
  @Input() articleId: number;
  @ViewChild('f') Articleform: NgForm;
  constructor(private commentsService: CommentsService, private storageService: StorageService,
    private likesService: LikesService, private scrollService: ScrollService, private router: Router) { }

  answerClicked = false;
  answerVisibility() {
    this.answerClicked = !this.answerClicked;
  }
  scroll() {
    this.scrollService.triggerScrollTo('comment-' + this.parentCommentId);
  }

  submitComment(form) {
    const payload = {
      article: {
        id: this.articleId
      },
      content: form.value.comment,
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

  changeLike(liked) {
    const payload = {
      commentId: this.comment.id,
      liked: liked
    };
    console.log(payload);
    this.likesService.commentChangeLike(payload)
    .subscribe(
      (res) => {
        console.log(res);
        if (payload.liked) {
          this.comment.likesCount ++;
        } else {
          this.comment.likesCount --;
        }
        this.comment.liked = payload.liked;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  ngOnInit() {
  }

}
