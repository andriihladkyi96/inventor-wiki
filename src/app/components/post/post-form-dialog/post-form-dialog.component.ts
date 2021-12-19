import { Component, Inject, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Editor, Toolbar } from 'ngx-editor';
import { Subscription } from 'rxjs';
import { Category, SubCategory } from 'src/app/models/Category';
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

  post: Post = { id: "", title: "", category: "", subcategory: "", content: "", authorId: "", dateCreation: "data", dateLastModification: "data", isVisible: true };
  categories: any[] = [];
  subscription: Subscription;
  editor: Editor;
  subcategories?: SubCategory[];
  isFormTouched = false;
  placeholder = 'Type content here...';
  localContent: string;
  isContentValid = false;
  isTitleValid = false;
  isCategoryValid = false;

  toolbar: Toolbar = [
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] },
      'link', 'image',
      'bold', 'italic',
      'underline', 'strike',
      'code', 'blockquote',
      'ordered_list', 'bullet_list',
      'align_left', 'align_center', 'align_right', 'align_justify'],
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
    if (this.isFormValid()) {
      this.dialogRef.close(true);
      if (this.data.operatingMode == OperatingMode.Create) {
        this.postsService.createPost({
          ...this.post,
          dateCreation: new Date().toString(),
          dateLastModification: new Date().toString(),
        });
      }
      if (this.data.operatingMode == OperatingMode.Edit && this.data.post != undefined) {
        this.postsService.updatePost({ ...this.post, dateLastModification: new Date().toString() });
      }
    } else {
      this.isFormTouched = true;
    }
  }

  cancel() {
    this.dialogRef.close(false);
  }


  toogleCategory(category: Category, index: number) {
    this.post.category = category.name;
    this.subcategories = this.categories[index].subCategories;
    this.post.subcategory = "";
    this.isCategoryValid = true;
  }

  toogleSubCategory(categoryName: string) {
    this.post.subcategory = categoryName;
  }

  isFormValid() {
    return this.isTitleValid && this.isCategoryValid && this.isContentValid;
  }

  onTitleChange() {
    this.isTitleValid = this.post.title !== "";
  }

  onCategoryChange() {
    this.isCategoryValid = this.post.category !== "";
  }

  onEditorContentChange() {
    let extractContent = this.extractContent(this.post.content);
    extractContent = extractContent ? extractContent : "";
    this.isContentValid = extractContent.length > 9;
  }

  private initializeUserId() {
    const currentUser = this.usersService.getCurrentUser();
    if (currentUser.id) {
      this.post.authorId = currentUser.id;
    }
  }


  onPaste(event: ClipboardEvent) {
    this.post.content = this.cleanInnerStyles(this.post.content);
  }

  cleanInnerStyles(htmlString: string) {
    let divElement = document.createElement('div');
    divElement.innerHTML = htmlString;
    let elements = divElement.getElementsByTagName("*");
    for (var i = 0; i < elements.length; i++) {
      if ((elements[i].getAttribute('style') || '').includes('background-color')) {
        elements[i].removeAttribute('style');
      }
      if ((elements[i].getAttribute('style') || '').includes('color')) {
        elements[i].removeAttribute('style');
      }
    }
    return divElement.innerHTML;
  }

  extractContent(html: string) {
    return new DOMParser().parseFromString(html, "text/html").documentElement.textContent;
  }

  private initializeCategories() {
    this.subscription = this.categoriesService.getCategoryList().subscribe(
      categories => this.categories = categories
    )
  }
}
