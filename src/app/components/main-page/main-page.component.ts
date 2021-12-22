
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
import { Router } from '@angular/router';
import { User } from "../../models/User";
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-main-page-with-posts',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.scss']
})


export class MainPageComponent implements OnInit {

  allPosts: Post[] = [];
  allCategories: Category[];
  hidenButton: boolean = false;
  collapseSubCategory: boolean = false;
  categoryInfo: Category;
  currentUser?: User;

  matDialogConfig = {
    width: 'auto',
    height: 'auto',
    maxHeight: '100vh',
    maxWidth: '94vw',
    "z-index": 10,
  };


  constructor(private postService: PostsService,
    private categoriesService: CategoriesService,
    private authService: AuthService,
    private userService: UsersService,
    private router: Router,
    private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.currentUser = this.userService.getCurrentUser();
    if (this.currentUser) {
      this.getAllCategories();
    }
    this.router.events.subscribe(
      () => {
        this.dialog.closeAll();
      }
    );
  }

  getAllPost() {
    this.postService.getPostList().pipe(
      map(
        posts => posts.filter(
          post => {
            return this.allCategories.find(
              category => {
                return category.name === post.category
              }
            )
          }
        )
      )
    ).subscribe(posts => {
      this.allPosts = posts
    })
  }

  getAllCategories() {
    if (this.currentUser) {
      let roleUser = this.currentUser.role;
      if (!(roleUser === "Admin" || roleUser === "SuperAdmin")) {
        this.categoriesService.getCategoryList().pipe(
          map(categories => {
            return categories.filter(category => {
              return category.role.some(role => role === roleUser || role === "All")
            })
          })
        ).subscribe(categories => this.allCategories = categories)
      } else {
        this.categoriesService.getCategoryList().subscribe(categories => this.allCategories = categories)
      }
      this.getAllPost();
      this.allCategories.sort((a: any, b: any) => (a.name > b.name) ? 1 : -1)
      this.allCategories.map((a: any) => {
        a.subCategories?.((a: any, b: any) => (a.name > b.name) ? 1 : -1)
      })
    }
  }


  getQueryFromCategory(category: string) {
    this.postService.getPostsByCategory(category).subscribe(onePost => this.allPosts = onePost)
  }

  getQueryFromSubCategories(subCategories: string) {
    this.postService.getPostsBySubCategory(subCategories).subscribe(subCategory => this.allPosts = subCategory)
  }

  editPostForAdmin(post: Post) {
    this.dialog.open(PostFormDialogComponent, {
      data: { operatingMode: OperatingMode.Edit, post: post },
      ...this.matDialogConfig
    });
  }

  addPost() {
    this.dialog.open(PostFormDialogComponent, {
      data: { operatingMode: OperatingMode.Create, post: undefined },
      ...this.matDialogConfig
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

  navigate(url: string, postId: string) {
    this.router.navigate([url, postId]);
  }

  get isSuperAdmin(): boolean {
    return this.currentUser?.role === "SuperAdmin"
  }

  get isAdmin(): boolean {
    return this.currentUser?.role === "Admin"
  }

  get isGuest(): boolean {
    return !this.currentUser;
  }

  getSubCategoryList(post: Category) {
    this.collapseSubCategory = true;
    return this.categoryInfo = post
  }
}
