import { UsersService } from './../../../services/users.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Post } from '../../../models/Post';
import { PostsService } from '../../../services/posts.service';
import { WarningDialogComponent } from '../post-dialogs/warning-dialog/warning-gialog.component';
import { User } from 'src/app/models/User';
import { OperatingMode, PostFormDialogComponent } from '../post-form-dialog/post-form-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.scss']
})
export class UserPostsComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  userId?: string;
  currentUser?: User;
  postInFocus?: Post;
  postInFocusPosition: number;
  subscription: Subscription;
  userHasNoPosts = true;
  isLoading = true;

  matDialogConfig = {
    width: 'auto',
    height: 'auto',
    maxHeight: '100vh',
    maxWidth: '94vw',
  };

  constructor(private postsService: PostsService, public dialog: MatDialog, private usersService: UsersService, private router: Router) { }

  ngOnInit() {
    this.currentUser = this.usersService.getCurrentUser();
    if (this.currentUser) {
      this.userId = this.currentUser.id;
      this.getPostsByUserId();
    }
    this.router.events.subscribe(
      () => {
        this.dialog.closeAll();
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  getPostsByUserId() {
    if (this.userId) {
      this.subscription = this.postsService.getPostsByUserId(this.userId).subscribe(posts => {
        if (posts.length !== 0) {
          this.posts = posts
          if (!this.postInFocus) {
            this.isInFocus(posts[posts.length - 1]);
          }
          this.userHasNoPosts = false;
        } else {
          this.userHasNoPosts = true;
        }
        this.isLoading = false;
      })
    }
  }

  isInFocus(post: Post) {
    this.postInFocus = post;
    this.postInFocusPosition = this.posts.findIndex(e => e.id == post.id);
  }

  editPost(post: Post) {
    this.dialog.open(PostFormDialogComponent, {
      data: { operatingMode: OperatingMode.Edit, post: post },
      ...this.matDialogConfig
    }).afterClosed().subscribe(
      (result) => {
        if (result) {
          this.isInFocus(this.posts[this.postInFocusPosition])
        }
      }
    )
  }

  addPost() {
    this.dialog.open(PostFormDialogComponent, {
      data: { operatingMode: OperatingMode.Create, post: undefined },
      ...this.matDialogConfig
    }).afterClosed().subscribe(
        (result) => {
          if (result) {
            this.isInFocus(this.posts[this.posts.length - 1])
          }
        }
      )
  }

  deletePost(post: Post) {
    this.dialog.open(WarningDialogComponent, {
      data: {
        title: "Delete post",
        message: "This post and its content will be deleted. You won't be able to resume this post.",
        firstButtonText: 'Cancel',
        secondButtonText: 'Delete'
      },
      ...this.matDialogConfig
    }).afterClosed()
      .subscribe(result => {
        if (result) {
          this.postsService.deletePost(post.id).then(() => {
            if (this.posts.length !== 0) {
              if (this.posts.length == this.postInFocusPosition) {
                this.isInFocus(this.posts[this.postInFocusPosition - 1]);
              } else {
                this.isInFocus(this.posts[this.postInFocusPosition]);
              }
            } else {
              this.postInFocus = undefined;
            }
          });
        }
      })
  }

  nextPost() {
    this.isInFocus(this.posts[this.postInFocusPosition + 1]);
  }

  prevPost() {
    this.isInFocus(this.posts[this.postInFocusPosition - 1]);
  }

  togglePostVisibility() {
    if (this.postInFocus) {
      this.postInFocus = { ...this.postInFocus, isVisible: !this.postInFocus.isVisible }
      this.postsService.updatePost(this.postInFocus).then(()=>{
        this.postInFocus = this.posts[this.postInFocusPosition];
      })
    }
  }
}
