import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/models/Post';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-post-view-wrapper',
  templateUrl: './post-view-wrapper.component.html',
  styleUrls: ['./post-view-wrapper.component.scss']
})
export class PostViewWrapperComponent implements OnInit,OnDestroy {

  post: Post = { id: "", title: "", category: "", content: "", authorId: "", dateCreation: "", dateLastModification: "", isVisible: true };
  subscriptionPost: Subscription;
  subscriptionId: Subscription;

  constructor(private route: ActivatedRoute, private postsService:PostsService) { }

  ngOnInit() {
    this.subscriptionId = this.route.paramMap.subscribe(
      params => {
        if(this.subscriptionPost){
          this.subscriptionPost.unsubscribe;
        }
        this.subscriptionPost = this.postsService.getPost(params.get('id') as string).subscribe(
          post => this.post = post
        );
      }
    )
  }

  ngOnDestroy(): void {
    this.subscriptionPost.unsubscribe(); 
    this.subscriptionId.unsubscribe(); 
  }
}
