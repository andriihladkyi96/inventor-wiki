import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Post } from '../../../models/Post';
import { PostsService } from '../../../services/posts.service';
import { MatMenuTrigger } from '@angular/material/menu';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {

  public posts: Post[];
  post: Post = { id: "", title: "", category: "", content: "", authorId: 1 }
  postInFocus: Post;
  postInFocusId: number = 0;
  subscription: Subscription;
  editablePosts: string[] = [];
  htmlContent = '';
  title = '';

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold']
    ],
  };

  // @ViewChild('menuTrigger') menuTrigger: MatMenuTrigger;

  // openDialog() {
  //   const dialogRef = this.dialog.open(DialogFromMenuExampleDialog, { restoreFocus: false });

  //   // Manually restore focus to the menu trigger since the element that
  //   // opens the dialog won't be in the DOM any more when the dialog closes.
  //   dialogRef.afterClosed().subscribe(() => this.menuTrigger.focus());
  // }

  constructor(private postsService: PostsService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getPostsByUserId();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  getPostsByUserId() {
    this.subscription = this.postsService.getPostsByUserId(1).subscribe(posts => {
      this.posts = posts
      if(!this.postInFocus){
        this.isInFocus(posts[posts.length-1]);
      }
    })
  }

  isInFocus(post: Post) {
    this.postInFocus = post;
    this.htmlContent = post.content;
    this.title = post.title;
    this.postInFocusId = this.posts.findIndex(e => e.id === post.id );
  }

  addPost() {
    this.postsService.createPost({ id: "", title: "New post title", category: "New post category", content: "New post content", authorId: 1 })
      .then(() => {
        this.postInFocus = this.posts[this.posts.length - 1];
        this.toogleIsEditPost(this.postInFocus.id);
      })
  }

  updatePost(){ 
    this.postsService.updatePost({...this.postInFocus,title: this.title, content: this.htmlContent });
    this.toogleIsEditPost(this.postInFocus.id);
  }

  deletePost(id: string) {
    this.postsService.deletePost(id);
  }

  toogleIsEditPost(id: string) {
    let index = this.editablePosts.findIndex(postId => postId === id )
    if (index == -1) {
      this.editablePosts.push(id);
    } else {
      this.editablePosts.splice(index);
    }
  }

  isPostEdit(id: string) {
    return this.editablePosts.find(postId =>  postId == id )
  }

  nextPost(){
    if(this.postInFocusId !== this.posts.length - 1){
      this.isInFocus(this.posts[this.postInFocusId + 1]);
    }
  }

  prevPost(){
    if(this.postInFocusId !== 0){
      this.isInFocus(this.posts[this.postInFocusId - 1]);
    }
  }
}
