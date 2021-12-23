import {Component, OnInit} from '@angular/core';
import {CategoriesService} from "../../services/categories.service";
import {Category} from "../../models/Category";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {RoleService} from "../../services/role.service";
import {Role} from "../../models/Role";
import {UsersService} from "../../services/users.service";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {WarningCategoryComponent, warningDialogData} from "./warning/warning-category.component";

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})

export class AddCategoryComponent implements OnInit {
  form: FormGroup;
  allCategory: Category[];
  isHiden: boolean = true;
  showCategoryBtn: boolean = false;
  disabledSubCategBtn: boolean = false;
  disableMultiSelect: boolean = false;
  sortMenu: string = '';
  roleList: Role[];

  get subCategoriesFormArray() {
    return this.form.get('subCategories') as FormArray
  }

  get category() {
    return this.form.get('category') as FormControl
  }

  get subCategories() {
    return this.form.get('subCategories') as FormControl
  }

  constructor(private categoryService: CategoriesService,
              private roleService: RoleService,
              private userService: UsersService,
              private dialog: MatDialog,
              private router: Router) {
    this.roleService.getAllRoles().subscribe(role => this.roleList = role)

    this.form = new FormGroup({
      category: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern('^[A-Z].*')
      ]),
      categoryByRole: new FormControl(),
      subCategories: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
        Validators.pattern('^[A-Z].*')
      ]),
    });
  }

  modalDialog(dialogData: warningDialogData): any {
    const dialogRef = this.dialog.open(WarningCategoryComponent, {
      data: dialogData
    })
    this.router.events.subscribe(() => {
      this.dialog.closeAll();
    })
    return dialogRef.afterClosed()
  }

  ngOnInit() {
    this.categoryService.getCategoryList().subscribe(allCategory => this.allCategory = allCategory
      .sort((a: any, b: any) => (a.name > b.name) ? 1 : -1));
  }

  saveSubCategory(): void {
    const subCategory = {name: this.subCategories.value}
    let category = this.allCategory.find(categories => categories.name === this.form.value.category)
    if (category?.subCategories?.find(subCategories => subCategories.name === subCategory.name)) {
      this.disabledSubCategBtn = false

      return this.modalDialog({
        title: 'Warning'!,
        message: 'This sub-category already exist'
      })

    } else if (category) {
      if (!category.subCategories) {

        category = {...category, subCategories: []}
      }
      category.subCategories?.push(subCategory)
      this.categoryService.updateCategory(category);
      this.subCategories.reset()
    } else {
      return
    }
  }

  saveCategory() {
    if (this.allCategory.find(allCategory => allCategory.name === this.form.value.category)) {
      return this.modalDialog({
        title: 'Warning'!,
        message: 'This category already exist'
      })
    } else {
      this.categoryService.createCategory({
        id: '',
        name: this.form.value.category,
        subCategories: [],
        role: this.form.value.categoryByRole ? this.form.value.categoryByRole : ['All']
      })
    }
    this.isHiden = !this.isHiden
  }

  resetForm() {
    this.form.reset()
    this.isHiden = true
  }

  get isSuperAdmin(): boolean {
    return this.userService.checkUserRole() === "SuperAdmin"
  }

  get isAdmin(): boolean {
    return this.userService.checkUserRole() === "Admin"
  }
}
