import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Comment } from '../models/comment-model';
import { CommentsService } from '../services/comments.service';
import { StorageService } from '../services/storage.service';
import { LikesService } from '../services/likes.service';
import { ScrollService } from '../services/scroll.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
  constructor(private commentsService: CommentsService,
    private storageService: StorageService,
    private likesService: LikesService,
    private scrollService: ScrollService,
    private toastr: ToastrService) { }

  answerClicked = false;
  answerVisibility() {
    this.answerClicked = !this.answerClicked;
    this.commentsService.setActiveCommentForm(this.comment.id);
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
        this.toastr.success('Comment created!', 'Success!');
      },
      (err) => {
        if (err.code === 401) {
          this.toastr.error('You have to be Log In to write comments!');
        } else {
          this.toastr.error(err.error.error);
        }
      }
    );
  }

  changeLike(liked) {
    const payload = {
      commentId: this.comment.id,
      liked: liked
    };
    this.likesService.commentChangeLike(payload)
    .subscribe(
      (res) => {
        if (payload.liked) {
          this.comment.likesCount ++;
          this.toastr.success('You liked this comment!', 'Liked!');
        } else {
          this.comment.likesCount --;
          this.toastr.success('You unliked this comment!', 'Unliked!');
        }
        this.comment.liked = payload.liked;
      },
      (err) => {
        if (err.code === 401) {
          this.toastr.error('You have to be Log In to give likes!');
        } else {
          this.toastr.error(err.error.error);
        }
      }
    );
  }
  ngOnInit() {
    this.commentsService.$activeCommentForm.subscribe(
      res => {
        if (res !== this.comment.id) {
          this.answerClicked = false;
        }
      }
    );
  }

}
