import { Category, SubCategory } from './../../../models/Category';
import { CategoriesService } from './../../../services/categories.service';
import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../../../models/Post';
import { PostsService } from '../../../services/posts.service';
import { Subscription } from 'rxjs';
import { Editor, Toolbar, Validators } from 'ngx-editor';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit, OnDestroy {

  @Input() post: Post = { id: "", title: "", category: "",subcategory:"", content: "", authorId: "", dateCreation:"dara",dateLastModification:"data",isVisible:true};
  @Output() postSaved = new EventEmitter<boolean>();
  categories: Category[] = [];
  subcategories?:SubCategory[];
  subscription: Subscription;
  editor: Editor;
  isFormTouched = false;
  placeholder = 'Type content here...';

  toolbar: Toolbar = [
    [{ heading: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] },
      'link', 'image',
      'bold', 'italic',
      'underline', 'strike',
      'code', 'blockquote',
      'ordered_list', 'bullet_list',
      'align_left', 'align_center', 'align_right', 'align_justify'],
  ];

  constructor(private postsService: PostsService, private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.subscription = this.categoriesService.getCategoryList().subscribe(
      categories => this.categories = categories 
    )
    this.editor = new Editor();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.editor.destroy();
  }

  updatePost() {
    this.postsService.updatePost(this.post);
    this.postSaved.emit(true);
  }

  toogleCategory(category: Category, index: number) {
    this.post.category = category.name;
    this.subcategories = this.categories[index].subCategories;
    this.post.subcategory = "";
  }

  toogleSubCategory(categoryName: string) {
    this.post.subcategory = categoryName;
  }

  isFormValid() {
    return this.isTitleValid() && this.isCategoryValid()&& this.isContentValid();
  }

  isTitleValid() {
    return this.post.title !== "";
  }

  isCategoryValid() {
    return this.post.category !== "";
  }

  isContentValid() {
    return this.post.content !== "" && this.post.content.length > 10;
  }
  
}

