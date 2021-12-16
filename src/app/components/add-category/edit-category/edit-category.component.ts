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
categoryInfo:Category;
  form: FormGroup;
  subCategoryArray:Array<any>;
  allCateg:Category[];
  roleList:Role[];

  constructor(private router:Router,
              private categoryService:CategoriesService,
              private roleService:RoleService
              ) {
    this.roleService.getAllRoles().subscribe(role => this.roleList = role);
    this.categoryService.getCategoryList().subscribe(category => this.allCateg = category );
    this.categoryInfo = this.router.getCurrentNavigation()?.extras.state as Category
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
      categoryByRole:new FormControl(this.categoryInfo.role),
      subCategories: new FormArray(this.subCategoryArray,
        [])
    });
  // , { validators: this.identityRevealedValidator }

  }

  get subCategoriesFormArray() {
    return this.form.get('subCategories') as FormArray;
  }
  // identityRevealedValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  //   const subCategories = control.get('subCategories');
  //   const subCategory = control.get('subCategories')?.value;
  //
  //   return subCategories && subCategory && subCategories.value == subCategory.value ? { identityNotRevealed: true } : null;
  // };

  updateCategory() {

    const subCategories = this.form.controls['subCategories'].value.map((sub:any) => ({
      name:sub
    }))
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

    const category = {
      id:this.categoryInfo.id,
      name:this.form.controls['category'].value,
      subCategories: subCategories.length ? subCategories : [],
      role:this.form.controls['categoryByRole'].value.length ? this.form.controls['categoryByRole'].value : ['All']
    }
    // if (this.allCateg.find(value => value.name === this.form.value.category)) {
    //   return alert('category already exist');
    // }

    // console.log(category)
    // console.log(newCategoryArr)
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
