import {Component, OnChanges, OnInit} from '@angular/core';
import {Category} from "../../../models/Category";
import {Router} from "@angular/router";
import {CategoriesService} from "../../../services/categories.service";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit, OnChanges {
categoryInfo:Category;
  form: FormGroup;
  numberOfSubCategory:any
  subCategoryArray:Array<any>;

  constructor(private router:Router,
              private categoryService:CategoriesService,
              private fb:FormBuilder) {
    this.categoryInfo = this.router.getCurrentNavigation()?.extras.state as Category;
    if (this.categoryInfo.subCategories?.length) {

      this.subCategoryArray = this.categoryInfo.subCategories?.map(sub => {
        return new FormControl(sub.name);
      } )
    }
    else {
      this.subCategoryArray = []
    }

    this.form = new FormGroup({
      category: new FormControl( this.categoryInfo.name,[
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
      ]),
      subCategories: new FormArray(this.subCategoryArray,    /*new FormControl(this.categoryInfo.subCategories)*/
        [
          Validators.minLength(3),
          Validators.maxLength(20)
        ])
    });
    // this.numberOfSubCategory = this.categoryInfo.subCategories?.length

  }

  get subCategoriesFormArray() {
    return this.form.get('subCategories') as FormArray;
  }
  // get categoryForm() {
  //   return this.form.get('subCategories') as FormArray
  // }
  //
  // addNewSubCategories() {
  //   const subCat = this.fb.group({
  //     name:['',[
  //       Validators.required,
  //       Validators.minLength(3)
  //     ]]
  //   })
  //   this.categoryForm.push(subCat)
  // }


  updateCategory() {
    const subCategories = this.form.controls['subCategories'].value.map((sub:any) => ({
      name:sub
    }))
    const category = {
      id:this.categoryInfo.id,
      name:this.form.controls['category'].value,
      subCategories: subCategories.length ? subCategories : []
    }
this.categoryService.updateCategory(category)

  }

  ngOnInit(): void {
   // Array(this.numberOfSubCategory).fill(1).forEach(()=> this.subCategoriesFormArray.push(new FormControl(this.categoryInfo.subCategories)))
  }
  ngOnChanges() {
    // Array()
  }

  deleteCategory(id:string) {
    this.categoryService.deleteCategory(id)
  }
  addSubCategory() {
    this.subCategoriesFormArray.push(new FormControl(null));
  }

  removeSubCategories(index:number) {
      this.subCategoriesFormArray.removeAt(index);
    }
}
