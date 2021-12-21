import {Component, OnInit} from '@angular/core';
import {Category} from "../../../models/Category";
import {Router} from "@angular/router";
import {CategoriesService} from "../../../services/categories.service";
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {Role} from "../../../models/Role";
import {RoleService} from "../../../services/role.service";
import {newArray} from "@angular/compiler/src/util";

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {
  allCategory: Category[];
  categoryInfo: Category;
  form: FormGroup;
  subCategoryArray: Array<any>;
  roleList: Role[];
  readonly:boolean = true;

  constructor(private router: Router,
              private categoryService: CategoriesService,
              private roleService: RoleService
  ) {
    this.roleService.getAllRoles().subscribe(role => this.roleList = role);
    this.categoryInfo = this.router.getCurrentNavigation()?.extras.state as Category
    if (this.categoryInfo.subCategories?.length) {

      this.subCategoryArray = this.categoryInfo.subCategories?.map(sub => {
        return new FormControl(sub.name, [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern('^[A-Z].*')]);
      })
    }
    else {
      this.subCategoryArray = []
    }

    this.form = new FormGroup({
      category: new FormControl({value:this.categoryInfo.name, disabled:true}, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern('^[A-Z].*')
      ]),
      categoryByRole: new FormControl(this.categoryInfo.role),
      subCategories: new FormArray(this.subCategoryArray,
        [])
    }
    )
  }

  get subCategoriesFormArray() {
    return this.form.get('subCategories') as FormArray;
  }

  get category() {
    return this.form.get('category') as FormControl;
  }

  updateCategory():any {
    const subCategories = this.form.controls['subCategories'].value.map((sub: any) => ({
      name: sub
    }))

    const category = {
      id: this.categoryInfo.id,
      name: this.form.controls['category'].value,
      subCategories: subCategories.length ? subCategories: [],
      role: this.form.controls['categoryByRole'].value.length ? this.form.controls['categoryByRole'].value : ['All']
    }
    this.categoryService.updateCategory(category)

    // let newCategoryNamesArr = [];
    // for (let category of allCategoryNames) {
    //   newCategoryNamesArr.push(category.name)
    //   for (let i = 0; i < newCategoryNamesArr.length; i++)
    //   {
    //     if (newCategoryNamesArr.indexOf(newCategoryNamesArr[i]) === newCategoryNamesArr.lastIndexOf(newCategoryNamesArr[i])) {
    //       return alert('this categories already exist');
    //     }
    //   }
    // }

    // let newSubArr = [];
    // for (let sub of subCategories) {
    //   newSubArr.push(sub.name)
    //   for (let i = 0; i < newSubArr.length; i++)
    //   {
    //     if (newSubArr.indexOf(newSubArr[i]) !== newSubArr.lastIndexOf(newSubArr[i])) {
    //       return alert('this sub-categories already exist');
    //     }
    //   }
    // }
    // else {}
    //   const category = {
    //     id: this.categoryInfo.id,
    //     name: this.form.controls['category'].value,
    //     subCategories: subCategories.length ? subCategories : [],
    //     role: this.form.controls['categoryByRole'].value.length ? this.form.controls['categoryByRole'].value : ['All']
    //   }
  }

  ngOnInit(): void {
    this.categoryService.getCategoryList().subscribe(value => this.allCategory = value);
  }

  deleteCategory(id: string) {
    this.categoryService.deleteCategory(id);
  }

  addSubCategory() {
    this.subCategoriesFormArray.push(new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern('^[A-Z].*')]));
  }

  removeSubCategories(index: number) {
    this.subCategoriesFormArray.removeAt(index);
  }
}
