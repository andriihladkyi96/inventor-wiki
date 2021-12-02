import { Component, EventEmitter, Input, Output} from '@angular/core';
import { Post } from '../../../models/Post';
import { PostsService } from '../../../services/posts.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent{

  @Input() post: Post;
  @Output() postSaved = new EventEmitter<boolean>();

  // displayedColumns: string[] = ['name', 'lastName', 'email', 'phoneNumber', 'companyName', 'numberOfEmployees'];

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

  constructor(private postsService: PostsService) { }

  updatePost(){ 
    this.postsService.updatePost(this.post);
    this.postSaved.emit(true);
  }

}
