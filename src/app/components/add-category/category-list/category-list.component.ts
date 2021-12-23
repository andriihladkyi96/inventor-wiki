import {Component, Input, OnInit} from '@angular/core';
import {Category} from "../../../models/Category";
import {ActivatedRoute, Router} from "@angular/router";
import {User} from "../../../models/User";
import {UsersService} from "../../../services/users.service";
import {CategoriesService} from "../../../services/categories.service";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {
  currentUser?: User;
  allCategories: Category[];
  @Input()
  category: Category;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private userService: UsersService,
              private categoriesService: CategoriesService) {
  }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.currentUser = this.userService.getCurrentUser();
    this.getAllCategories();
  }

  getAllCategories() {
    this.categoriesService.getCategoryList().subscribe(allCategories => {
        if (this.currentUser) {
          if (this.currentUser?.role === "Admin" || this.currentUser?.role === 'SuperAdmin') {
            this.allCategories = allCategories
          } else {
            this.allCategories = allCategories.filter(category => {
                return category.role.find(role => {
                  if (role == 'All') {
                    return true
                  }
                  return role == this.currentUser?.role;
                });
              }
            )
          }
        } else {
          this.allCategories = allCategories.filter(category => category.role.find(role => role == 'All'));
        }
      }
    )
    this.category.subCategories?.sort((a: any, b: any) => (a.name > b.name) ? 1 : -1);
  }

  editCategory() {
    this.router.navigate([this.category.id],
      {relativeTo: this.activatedRoute, state: this.category});
  }

  get isSuperAdmin(): boolean {
    return this.userService.checkUserRole() === "SuperAdmin"
  }

  get isAdmin(): boolean {
    return this.userService.checkUserRole() === "Admin"
  }
}
