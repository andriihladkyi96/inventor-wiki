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

  allPosts:Post[];
  allCategories:Category[];
  hidenButton:boolean = false;
  isCollapsed:boolean = false;
  info:boolean = false;
  categoryInfo:Category;


  constructor(private postService:PostsService,
              private categoriesService:CategoriesService,
              private authService:AuthService,
              private userService:UsersService) {




  }
  getQueryFromCategory(category:string) {
      this.postService.getPostsByCategory(category).subscribe(onePost => this.allPosts = onePost)
  }

  ngOnInit(): void {
    this.categoriesService.getCategoryList().subscribe(value => this.allCategories = value);
    this.getAllPost()
  }

  getAllPost () {
    this.postService.getPostList().subscribe(post => this.allPosts = post);
  }

  editPostForAdmin(id:any) {
    console.log(id)
  }

  get isSuperAdmin(): boolean {
    return this.userService.checkUserRole() === "SuperAdmin"
  }

  get isAdmin(): boolean {
    return this.userService.checkUserRole() === "Admin"
  }

  getSubCategoryList(post:Category) {
    this.info = !this.info;
    return this.categoryInfo = post
  }
}
