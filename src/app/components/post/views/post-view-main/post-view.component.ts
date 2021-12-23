import { User } from 'src/app/models/User';
import { Component, Input } from '@angular/core';
import { Post } from 'src/app/models/Post';


@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.scss']
})
export class PostViewComponent{
  @Input() post?: Post;
  @Input() user?: User;

  constructor() { }
}
