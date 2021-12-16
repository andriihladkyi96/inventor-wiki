import { Category } from './../../../models/Category';
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

  @Input() post: Post = { id: "", title: "", category: "", content: "", authorId: "", dateCreation:"dara",dateLastModification:"data",isVisible:true};
  @Output() postSaved = new EventEmitter<boolean>();
  categories: Category[] = [];
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

  form = new FormGroup({
    editorContent: new FormControl('', Validators.required()),
  })

  toogleCategory(category: Category) {
    this.post.category = category.name;
  }

  updatePost() {
    this.postsService.updatePost(this.post);
    this.postSaved.emit(true);
  }
}

