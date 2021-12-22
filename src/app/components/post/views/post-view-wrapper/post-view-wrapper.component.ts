import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/models/Post';
import { User } from 'src/app/models/User';
import { PostsService } from 'src/app/services/posts.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-post-view-wrapper',
  templateUrl: './post-view-wrapper.component.html',
  styleUrls: ['./post-view-wrapper.component.scss']
})
export class PostViewWrapperComponent implements OnInit, OnDestroy {

  post?: Post;
  subscriptionPost: Subscription;
  subscriptionId: Subscription;
  subscriptionUser: Subscription;
  user?: User;

  constructor(private route: ActivatedRoute, private postsService: PostsService, private usersService: UsersService) { }

  ngOnInit() {
    this.subscriptionId = this.route.paramMap.subscribe(
      params => {
        if (this.subscriptionPost) {
          this.subscriptionPost.unsubscribe;
        }
        this.subscriptionPost = this.postsService.getPost(params.get('id') as string).subscribe(
          post => {
            this.post = post
            if (this.post) {
              if (this.subscriptionUser) {
                this.subscriptionUser.unsubscribe;
              }
              this.subscriptionUser = this.usersService.getUser(this.post.authorId).subscribe(
                user => this.user = user
              )
            }
          }
        );
      }
    )
  }

  ngOnDestroy(): void {
    if (this.subscriptionPost) {
      this.subscriptionPost.unsubscribe();
    }
    if (this.subscriptionId) {
      this.subscriptionId.unsubscribe();
    }
    if (this.subscriptionUser) {
      this.subscriptionUser.unsubscribe();
    }
  }
}
