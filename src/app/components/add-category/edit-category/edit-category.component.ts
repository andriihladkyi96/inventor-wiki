import {Component, OnInit} from '@angular/core';
import {Category} from "../../../models/Category";
import {Router} from "@angular/router";
import {CategoriesService} from "../../../services/categories.service";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
categoryInfo:Category;
  form: FormGroup;
  subCategoryArray:Array<any>;
  allCateg:Category[];


  constructor(private router:Router,
              private categoryService:CategoriesService,
              ) {
    this.categoryInfo = this.router.getCurrentNavigation()?.extras.state as Category;
    this.categoryService.getCategoryList().subscribe(category => this.allCateg = category )
    if (this.categoryInfo.subCategories?.length) {

      this.subCategoryArray = this.categoryInfo.subCategories?.map(sub => {
        return new FormControl(sub.name, [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern('^[A-Z].*')]);
      } )
    }
    else {
      this.subCategoryArray = []
    }

    this.form = new FormGroup({
      category: new FormControl( this.categoryInfo.name,[
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern('^[A-Z].*')
      ]),
      subCategories: new FormArray(this.subCategoryArray,
        [])
    });

  }

  get subCategoriesFormArray() {
    return this.form.get('subCategories') as FormArray;
  }

  updateCategory() {
    const subCategories = this.form.controls['subCategories'].value.map((sub:any) => ({
      name:sub
    }))
    const category = {
      id:this.categoryInfo.id,
      name:this.form.controls['category'].value,
      subCategories: subCategories.length ? subCategories : []
    }
    // if (this.allCateg.find(value => value.name === category.name)) {
    //   return alert('category already exist');
    //
    // }

        this.categoryService.updateCategory(category)
  }

  ngOnInit(): void {
  }

  deleteCategory(id:string) {
    this.categoryService.deleteCategory(id);
  }

  addSubCategory() {
    this.subCategoriesFormArray.push(new FormControl(null,[
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern('^[A-Z].*')]));
    console.log(this.form.value)
    console.log(this.form.controls)
  }

  removeSubCategories(index:number) {
      this.subCategoriesFormArray.removeAt(index);
    }
}
