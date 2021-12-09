import {Component, OnInit} from '@angular/core';
import {CategoriesService} from "../../services/categories.service";
import {Category} from "../../models/Category";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})


export class AddCategoryComponent implements OnInit {

  form: FormGroup;
  allCategory: Category[];
  isHidenSaveCategoryBtn: boolean = false

  generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }


  get subCategoriesFormArray() {
    return this.form.get('subCategories') as FormArray;
  }

  constructor(private categoryService: CategoriesService) {
    this.form = new FormGroup({
      category: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
      ]),
      subCategories: new FormArray([],
        [
          Validators.minLength(3),
          Validators.maxLength(20)
        ])
    });
  }

  ngOnInit() {
    this.categoryService.getCategoryList().subscribe(value => this.allCategory = value)
  }


  saveSubCategory(index: any): void {
    const subCategory = {id: this.generateId(), name: this.subCategoriesFormArray.value[index]}
    console.log(subCategory)

    let category = this.allCategory.find(value => value.name === this.form.value.category)
    console.log(category)
    if (category) {
      if (!category.subCategories) {

        category = {...category, subCategories:[]}
      }
      category.subCategories?.push(subCategory)
      this.categoryService.updateCategory(category);
    } else {
      return
    }
  }

  saveCategory() {
    if (this.allCategory.find(value => value.name === this.form.value.category)) {
      alert('this category already exist')
    } else {
      this.categoryService.createCategory({
        id: '',
        name: this.form.value.category,
        subCategories: []

      })
      this.isHidenSaveCategoryBtn = !this.isHidenSaveCategoryBtn
    }

  }

  addSubCategory() {
    this.subCategoriesFormArray.push(new FormControl(null));
  }

  removeControl(index: number) {
    this.subCategoriesFormArray.removeAt(index);
  }


  deleteSubCategory(index: any) {
    (<FormArray>this.form.controls.subCategories).removeAt(index)
  }

  deleteCategory(ev: any) {

  }
}
