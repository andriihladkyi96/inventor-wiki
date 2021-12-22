import {Component, OnInit} from '@angular/core';
import {Category} from "../../../models/Category";
import {Router} from "@angular/router";
import {CategoriesService} from "../../../services/categories.service";
import {
  FormArray,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import {Role} from "../../../models/Role";
import {RoleService} from "../../../services/role.service";
import {WarningCategoryComponent, warningDialogData} from "../warning/warning-category.component";
import {MatDialog} from "@angular/material/dialog";

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
  isUpdatedBtnActive: boolean = false

  constructor(private router: Router,
              private categoryService: CategoriesService,
              private roleService: RoleService,
              private dialog: MatDialog
  ) {
    this.roleService.getAllRoles().subscribe(role => this.roleList = role);
    this.categoryInfo = this.router.getCurrentNavigation()?.extras.state as Category
    if (this.categoryInfo.subCategories?.length) {

      this.subCategoryArray = this.categoryInfo.subCategories?.map(sub => {
        return new FormControl({value: sub.name, disabled: true}, [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(20),
          Validators.pattern('^[A-Z].*')]);
      })
    } else {
      this.subCategoryArray = []
    }

    this.form = new FormGroup({
        category: new FormControl({value: this.categoryInfo.name, disabled: true}, [
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

  updateCategory(): any {
    const subCategories = this.form.getRawValue().subCategories.map((sub: any) => ({
      name: sub
    }))

    const category = {
      id: this.categoryInfo.id,
      name: this.form.controls['category'].value,
      subCategories: subCategories.length ? subCategories : [],
      role: this.form.controls['categoryByRole'].value.length ? this.form.controls['categoryByRole'].value : ['All']
    }

    this.categoryService.updateCategory(category);
    this.isUpdatedBtnActive = false;

    return this.modalDialog({
      message: 'Updated'
    })
  }

  ngOnInit(): void {
    this.categoryService.getCategoryList().subscribe(value => this.allCategory = value)
  }

  modalDialog(dialogData: warningDialogData): any {
    const dialogRef = this.dialog.open(WarningCategoryComponent, {
      data: dialogData
    })

    this.router.events.subscribe(() => {
      this.dialog.closeAll();
    })

    return dialogRef.afterClosed();
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
    this.isUpdatedBtnActive = true
  }

  removeSubCategories(index: number) {
    this.subCategoriesFormArray.removeAt(index);
    this.isUpdatedBtnActive = true;
  }
}
