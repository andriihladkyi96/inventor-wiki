import { Category } from './../../../models/Category';
import { CategoriesService } from './../../../services/categories.service';
import { Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../../../models/Post';
import { PostsService } from '../../../services/posts.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit,OnDestroy{

  @Input() post: Post = { id: "", title: "", category: "", content: "", authorId: 1 } ;
  @Output() postSaved = new EventEmitter<boolean>();
  categories: Category[] = [];
  subscription: Subscription;

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

  constructor(private postsService: PostsService, private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.subscription = this.categoriesService.getCategoryList().subscribe(
      categories => this.categories = categories
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  toogleCategory(category:Category){
    this.post.category = category.name;
  }

  updatePost(){ 
    this.postsService.updatePost(this.post);
    this.postSaved.emit(true);
  }
}

