import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/models/Category';
import { CategoriesService } from 'src/app/services/categories.service';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  public categories$: Observable<Category[]>;
  category: Category = { id: "", name: "" }

  constructor(private categoriesService: CategoriesService) { }

  ngOnInit() {
    this.categories$ = this.categoriesService.getCategoryList();
  }

  deleteCategory(id: string) {
    this.categoriesService.deleteCategory(id);
  }

  addCategory() {
    this.categoriesService.createCategory({ ...this.category });
  }

  updateCategory(category: Category) {
    this.categoriesService.updateCategory({ ...this.category, id: category.id });
  }
}
