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
  isHiden:boolean = true;
  showCategoryBtn: boolean = false;
  disabledSubCategBtn = false;
  sortMenu: string= '';

  get subCategoriesFormArray() {
    return this.form.get('subCategories') as FormArray;
  }

  constructor(private categoryService: CategoriesService) {
    this.form = new FormGroup({
      category: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern('^[A-Z].*')
      ]),
      subCategories: new FormArray([])
    });
  }

  ngOnInit() {
    this.categoryService.getCategoryList().subscribe(value => this.allCategory = value)
  }


  saveSubCategory(index: any): void {
    const subCategory = {name: this.subCategoriesFormArray.value[index]}

    let category = this.allCategory.find(value => value.name === this.form.value.category)
    if (category?.subCategories?.find(v => v.name === subCategory.name)){
      alert('this subcategory already exist');
      this.disabledSubCategBtn = false

    }
    else if (category) {
      if (!category.subCategories) {

        category = {...category, subCategories: []}
      }
      category.subCategories?.push(subCategory)
      this.categoryService.updateCategory(category);
      this.disabledSubCategBtn = !this.disabledSubCategBtn
    } else {
      return
    }
  }

  saveCategory() {
    if (this.allCategory.find(value => value.name === this.form.value.category)) {
      alert('this category already exist');
      this.disabledSubCategBtn = false
    } else {
      this.categoryService.createCategory({
        id: '',
        name: this.form.value.category,
        subCategories: []
      })

    }
    this.isHiden = !this.isHiden
    this.showCategoryBtn = !this.showCategoryBtn
  }

  addSubCategory() {
    this.subCategoriesFormArray.push(new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern('^[A-Z].*')
    ]));
    this.disabledSubCategBtn = !this.disabledSubCategBtn
  }

  removeControl(index: number) {
    this.subCategoriesFormArray.removeAt(index);
    this.disabledSubCategBtn = false
  }

  resetForm() {
    this.subCategoriesFormArray.clear()
    this.form.reset()
    this.showCategoryBtn = false
    this.isHiden = true
    this.disabledSubCategBtn = false
  }
}
