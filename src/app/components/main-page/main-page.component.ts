import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { PostsService } from "../../services/posts.service";
import { Post } from "../../models/Post";
import { Category } from "../../models/Category";
import { CategoriesService } from "../../services/categories.service";
import { UsersService } from "../../services/users.service";
import { MatDialog } from '@angular/material/dialog';
import { WarningDialogComponent } from '../post/post-dialogs/warning-dialog/warning-gialog.component';
import { OperatingMode, PostFormDialogComponent } from '../post/post-form-dialog/post-form-dialog.component';

@Component({
  selector: 'app-main-page-with-posts',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.scss']
})


export class MainPageComponent implements OnInit {

  allPosts: Post[];
  postCategories: Category[];
  loggedUser: any;
  hidenButton: boolean = false;
  emptyPostContent: string = 'Not yet any post in this category'

  constructor(private postService: PostsService,
    private categoriesService: CategoriesService,
    private authService: AuthService,
    private dialog: MatDialog,
    private userService: UsersService) {
    this.categoriesService.getCategoryList().subscribe(value => this.postCategories = value);
    this.postService.getPostList().subscribe(post => this.allPosts = post);
  }
  getQueryFromCategory(category: string) {
    this.postService.getPostsByCategory(category).subscribe(onePost => this.allPosts = onePost)
  }

  ngOnInit(): void { }

  editPostForAdmin(post: Post) {
    this.dialog.open(PostFormDialogComponent, {
      data: { operatingMode: OperatingMode.Edit, post: post }
    });
  }

  deletePostForAdmin(id: string) {
    this.dialog.open(WarningDialogComponent, {
      data: {
        title: "Delete post",
        message: "This post and its content will be deleted. You won't be able to resume this post.",
        firstButtonText: 'Cancel',
        secondButtonText: 'Delete'
      }
    }).afterClosed().subscribe(result => {
      if (result) {
        this.postService.deletePost(id);
      }
    })
  }

  get isSuperAdmin(): boolean {
    return this.userService.checkUserRole() === "SuperAdmin"
  }

  get isAdmin(): boolean {
    return this.userService.checkUserRole() === "Admin"
  }

}
