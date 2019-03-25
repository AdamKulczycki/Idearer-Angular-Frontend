import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Comment } from '../models/comment-model';
import { CommentsService } from '../services/comments.service';
import { StorageService } from '../services/storage.service';
import { LikesService } from '../services/likes.service';
import { ScrollService } from '../services/scroll.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit, OnDestroy {

  @Input() mainComment: boolean;
  @Input() parentCommentAuthor: string;
  @Input() parentCommentId: string;
  @Input() comment: Comment;
  @Input() articleId: number;
  @ViewChild('f') Articleform: NgForm;
  public commentAuthor: string;
  public answerClicked: boolean = false;
  public commentSubscription: Subscription;

  constructor(private commentsService: CommentsService,
    private storageService: StorageService,
    private likesService: LikesService,
    private scrollService: ScrollService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.commentSubscription = this.commentsService.$activeCommentForm.subscribe(
      res => {
        if (res !== this.comment.id) {
          this.answerClicked = false;
        }
      }
    );
    this.commentAuthor = this.storageService.get('username');
  }

  answerVisibility(): void {
    this.answerClicked = !this.answerClicked;
    this.commentsService.setActiveCommentForm(this.comment.id);
  }
  scroll() {
    this.scrollService.triggerScrollTo('comment-' + this.parentCommentId);
    const commentBox = document.getElementById('comment-' + this.parentCommentId);
    commentBox.classList.add('distinguish');
    setTimeout(() => {
      commentBox.classList.remove('distinguish');
    }, 1000);
  }

  submitComment(form): void {
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
          this.toastr.error('Server Error!');
        }
      }
    );
  }

  changeLike(liked): void {
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
          this.toastr.error('Server Error!');
        }
      }
    );
  }

  ngOnDestroy() {
    this.commentSubscription.unsubscribe();
  }
}
