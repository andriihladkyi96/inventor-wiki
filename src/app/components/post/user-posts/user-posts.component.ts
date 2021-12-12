import { UsersService } from './../../../services/users.service';
import { DialogData } from './../post-dialogs/warning-dialog/warning-gialog.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Post } from '../../../models/Post';
import { PostsService } from '../../../services/posts.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { WarningDialogComponent } from '../post-dialogs/warning-dialog/warning-gialog.component';
import { User } from 'src/app/models/User';


@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.scss']
})
export class UserPostsComponent implements OnInit {

  public posts: Post[] = [];
  isEdit = false;
  userId: string;
  currentUser: User;
  postCopy: Post;
  postInFocus: Post = { id: "", title: "", category: "", content: "", authorId: "", dateCreation:"dara",dateLastModification:"data",isVisible:true};;
  postInFocusPosition: number;
  subscription: Subscription;

  constructor(private postsService: PostsService, public dialog: MatDialog, private usersService: UsersService) { }

  ngOnInit() {
    this.currentUser = this.usersService.getCurrentUser();
    if (this.currentUser.id) {
      this.userId = this.currentUser.id;
    }
    this.getPostsByUserId();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  getPostsByUserId() {
    if (this.currentUser.role !== "SuperAdmin") {
      this.subscription = this.postsService.getPostsByUserId(this.userId).subscribe(posts => {
        this.posts = posts
        if (this.postInFocus.id == "") {
          this.isInFocus(posts[posts.length - 1]);
        }
      })
    } else {
      this.subscription = this.postsService.getPostList().subscribe(posts => {
        this.posts = posts
        if (this.postInFocus.id == "") {
          this.isInFocus(posts[posts.length - 1]);
        }
      })
    }
  }

  openDialog(dialogData: DialogData) {
    const dialogRef = this.dialog.open(WarningDialogComponent, {
      data: dialogData
    });
    return dialogRef.afterClosed()
  }

  isInFocus(post: Post) {
    if (this.postInFocus.id !== post.id) {
      if (this.isEdit && this.postWasChanged()) {
        this.openDialog(
          {
            title: "Warning",
            message: "Changes to your post have not been saved. If you move to another post the changes will be lost.",
            firstButtonText: 'Cancel',
            secondButtonText: 'Continue'
          })
          .subscribe(result => {
            if (result) {
              this.postInFocus = post;
              this.postInFocusPosition = this.posts.findIndex(e => e.id == post.id);
              this.toogleIsEdit(false);
            }
          })
      } else {
        this.postInFocus = post;
        this.postInFocusPosition = this.posts.findIndex(e => e.id == post.id);
        this.toogleIsEdit(false);
      }
    }
  }

  addPost() {
    this.postsService.createPost({
      id: "", 
      title: "New post title", 
      category: "New post category", 
      content: "New post content", 
      authorId: this.userId, 
      dateCreation: "data",
      dateLastModification: "data",
      isVisible: true,
    })
      .then(() => {
        this.isInFocus(this.posts[this.posts.length - 1]);
        this.toogleIsEdit(true);
      })
  }

  deletePost(post: Post) {
    this.openDialog(
      {
        title: "Delete post",
        message: "This post and its content will be deleted. You won't be able to resume this post.",
        firstButtonText: 'Cancel',
        secondButtonText: 'Delete'
      })
      .subscribe(result => {
        if (result) {
          this.postsService.deletePost(post.id);
          this.isInFocus(this.posts[this.postInFocusPosition - 1]);
        }
      })
  }

  toogleIsEdit(value: boolean) {
    this.isEdit = value;
    this.postCopy = { ...this.postInFocus };
  }

  nextPost() {
    this.isInFocus(this.posts[this.postInFocusPosition + 1]);
  }

  prevPost() {
    this.isInFocus(this.posts[this.postInFocusPosition - 1]);
  }

  postSaved(isSaved: boolean) {
    this.toogleIsEdit(false);
  }
 
  toggleVisibility(post:Post){
    this.postsService.updatePost({...post,isVisible:!post.isVisible});
  }
  private postWasChanged(): boolean {
    if (this.postCopy.title == this.postInFocus.title 
      && this.postCopy.category == this.postInFocus.category 
      && this.postCopy.content == this.postInFocus.content) {
      return false
    } else {
      return true
    }
  }
}
