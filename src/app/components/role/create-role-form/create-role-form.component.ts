import { Component, inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Role, Permissions } from 'src/app/models/Role';
import { RoleService } from 'src/app/services/role.service';
import { WarningComponent, warningDialogData } from '../warning/warning.component';


@Component({
  selector: 'app-create-role-form',
  templateUrl: './create-role-form.component.html',
  styleUrls: ['./create-role-form.component.scss']
})
export class CreateRoleFormComponent implements OnInit {

  allRoles: Role[];

  constructor(public router: Router, public dialogRef: MatDialog, private roleService: RoleService) { }

  roleForm = new FormGroup({
    roleName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    update: new FormControl(false),
    remove: new FormControl(false),
    createCategory: new FormControl(false)
  })

  get roleName() {
    return this.roleForm.get('roleName') as FormControl
  }

  get update() {
    return this.roleForm.get('update') as FormControl
  }

  get remove() {
    return this.roleForm.get('remove') as FormControl
  }

  get roleData() {
    const { roleName, update, remove, createCategory } = this.roleForm.value
    const permissions: Permissions = {
      update,
      remove,
      createCategory
    }
    const newRole: Role = {
      roleName,
      permissions: permissions
    }
    return newRole
  }

  modalDialog(dialogData: warningDialogData) {
    const dialogRef = this.dialogRef.open(WarningComponent, {
      data: dialogData,
      height: '80%',
      width: '80%',
    })
    this.router.events.subscribe(() => {
      this.dialogRef.closeAll();
    })
    return dialogRef.afterClosed()
  }

  createNewRole() {
    if (this.allRoles.find(v => v.roleName === this.roleForm.value.roleName)) {
      return this.modalDialog(
        {
          title: "Warning!",
          message: "This name already exists!"
        }
      )
    }
    return this.roleService.createRole(this.roleData),
      this.dialogRef.closeAll()
  }

  ngOnInit(): void {
    this.roleService.getAllRoles().subscribe(value => this.allRoles = value)
  }

}
