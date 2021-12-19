import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {PostsService} from "../../services/posts.service";
import {Post} from "../../models/Post";
import {Category} from "../../models/Category";
import {CategoriesService} from "../../services/categories.service";
import {UsersService} from "../../services/users.service";

@Component({
  selector: 'app-main-page-with-posts',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.scss']
})


export class MainPageComponent implements OnInit {

  allPosts: Post[];
  allCategories: Category[];
  hidenButton: boolean = false;
  collapseSubCategory: boolean = false;
  categoryInfo: Category;
  superAdmin: any = 'SuperAdmin';
  admin: any = 'Admin';
  user: any = 'User';
  allUser: any = 'All'


  constructor(private postService: PostsService,
              private categoriesService: CategoriesService,
              private authService: AuthService,
              private userService: UsersService) {
  }

  ngOnInit(): void {
    this.getAllPost();
    this.getAllCategories();
  }

  getAllPost() {
    this.postService.getPostList().subscribe(post => this.allPosts = post);
  }

  getAllCategories() {
    this.categoriesService.getCategoryList().subscribe(value => {
        if (this.currentUserRole === this.admin || this.currentUserRole === this.superAdmin)
          this.allCategories = value
        else {
          this.allCategories = value.filter(value1 =>
            value1.role.find(value2 => value2 === this.user || value2 === this.allUser
            )
          )
        }
      }
    )
  }

  getQueryFromCategory(category: string) {
    this.postService.getPostsByCategory(category).subscribe(onePost => this.allPosts = onePost)
  }

  getQueryFromSubCategories(subCategories: string) {
    this.postService.getPostsBySubCategory(subCategories).subscribe(subCategory => this.allPosts = subCategory)
  }

  editPostForAdmin(id: any) {
    console.log(id)
  }

  get isSuperAdmin(): boolean {
    return this.userService.checkUserRole() === "SuperAdmin"
  }

  get isAdmin(): boolean {
    return this.userService.checkUserRole() === "Admin"
  }

  get currentUserRole() {
    return this.userService.getCurrentUser().role
  }

  getSubCategoryList(post: Category) {
    this.collapseSubCategory = !this.collapseSubCategory;
    return this.categoryInfo = post
  }
}
