import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Editor, Toolbar } from 'ngx-editor';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/Category';
import { Post } from 'src/app/models/Post';
import { CategoriesService } from 'src/app/services/categories.service';
import { PostsService } from 'src/app/services/posts.service';
import { UsersService } from 'src/app/services/users.service';

export interface PostData {
  operatingMode: OperatingMode;
  post: Post | undefined;
}

export enum OperatingMode {
  Create = "create",
  Edit = "edit",
}

@Component({
  selector: 'app-post-form-dialog',
  templateUrl: './post-form-dialog.component.html',
  styleUrls: ['./post-form-dialog.component.scss']
})
export class PostFormDialogComponent implements OnInit {

  post: Post = { id: "", title: "", category: "", content: "", authorId: "", dateCreation: "data", dateLastModification: "data", isVisible: true };
  categories: any[] = [];
  subscription: Subscription;
  editor: Editor;

  toolbar: Toolbar = [
    ['bold', 'italic'],
    ['underline', 'strike'],
    ['code', 'blockquote'],
    ['ordered_list', 'bullet_list'],
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }],
    ['link', 'image'],
    ['text_color', 'background_color'],
    ['align_left', 'align_center', 'align_right', 'align_justify'],
  ];
  toolbar2: Toolbar = [
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] },'bold', 'italic','text_color', 'background_color','underline', 'strike','code', 'blockquote','ordered_list', 'bullet_list','link', 'image','align_left', 'align_center', 'align_right', 'align_justify'],
  ];
  toolbar3: Toolbar = [
    ['link', 'image','text_color', 'background_color','align_left', 'align_center', 'align_right', 'align_justify']
  ];
  

  constructor(
    public dialogRef: MatDialogRef<PostFormDialogComponent>,
    private postsService: PostsService,
    private usersService: UsersService,
    private categoriesService: CategoriesService,
    @Inject(MAT_DIALOG_DATA) public data: PostData
  ) { }

  ngOnInit(): void {
    if (this.data.operatingMode == OperatingMode.Create) {
      this.initializeUserId();
    }
    if (this.data.operatingMode == OperatingMode.Edit && this.data.post != undefined) {
      this.post = this.data.post;
    }
    this.initializeCategories();
    this.editor = new Editor();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.editor.destroy();
  }

  savePost() {
    this.dialogRef.close();
    if (this.data.operatingMode == OperatingMode.Create) {
      this.postsService.createPost(this.post);
    }
    if (this.data.operatingMode == OperatingMode.Edit && this.data.post != undefined) {
      this.postsService.updatePost(this.post);
    }
   
  }

  cancel() {
    this.dialogRef.close();
  }

  toogleCategory(category: Category) {
    this.post.category = category.name;
  }

  private initializeUserId() {
    const currentUser = this.usersService.getCurrentUser();
    if (currentUser.id) {
      this.post.authorId = currentUser.id;
    }
  }

  private initializeCategories() {
    this.subscription = this.categoriesService.getCategoryList().subscribe(
      categories => this.categories = categories
    )
  }
}
