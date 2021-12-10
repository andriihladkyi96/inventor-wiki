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
  postCategories:Category[];
  loggedUser:any;
  hidenButton:boolean = false;
  emptyPostContent:string = 'Not yet any post in this category'

  constructor(private postService:PostsService,
              private categoriesService:CategoriesService,
              private authService:AuthService,
              private userService:UsersService) {
    this.categoriesService.getCategoryList().subscribe(value => this.postCategories = value);
    this.postService.getPostList().subscribe(post => this.allPosts = post);



  }
  getQueryFromCategory(category:string) {
      this.postService.getPostsByCategory(category).subscribe(onePost => this.allPosts = onePost)
  }

  ngOnInit(): void {
    this.loggedUser = this.userService.getCurrentUser()
    if (this.loggedUser.role === 'Admin' || this.loggedUser.role === 'SuperAdmin') {
       this.hidenButton = true
    }
    console.log(this.hidenButton)
  }

  logOut() {
    this.authService.signOut()
  }

  editPostForAdmin(id:any) {
    console.log(id)
  }
}
