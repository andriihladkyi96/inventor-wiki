import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Role, Permissions } from 'src/app/models/Role';
import { RoleService } from 'src/app/services/role.service';
import { UsersService } from 'src/app/services/users.service';
import { WarningComponent, warningDialogData } from '../warning/warning.component';

@Component({
  selector: 'app-role-item',
  templateUrl: './role-item.component.html',
  styleUrls: ['./role-item.component.scss']
})
export class RoleItemComponent implements OnInit {

  users$ = this.usersService.getUsers()
  editState: boolean = false
  info: boolean = false
  infoItem: Role

  @Input() role: any

  constructor(private dialog: MatDialog, private usersService: UsersService, private roleService: RoleService, public router: Router) { }

  roleForm = new FormGroup({
    roleName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    create: new FormControl(false),
    read: new FormControl(false),
    update: new FormControl(false),
    remove: new FormControl(false),
    createCategory: new FormControl(false)
  })

  get roleName() {
    return this.roleForm.get('roleName') as FormControl
  }

  get create() {
    return this.roleForm.get('create') as FormControl
  }

  get read() {
    return this.roleForm.get('read') as FormControl
  }

  get update() {
    return this.roleForm.get('update') as FormControl
  }

  get remove() {
    return this.roleForm.get('remove') as FormControl
  }

  get roleData() {
    const { roleName, create, read, update, remove, createCategory } = this.roleForm.value
    const permissions: Permissions = {
      create,
      read,
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
    const dialogRef = this.dialog.open(WarningComponent, {
      data: dialogData
    })
    this.router.events.subscribe(() => {
      this.dialog.closeAll();
    })
    return dialogRef.afterClosed()
  }

  getInfo(value:boolean) {
    this.info = value
  }

  editRole(role: Role) {
    if (role.roleName === 'SuperAdmin') {
      return this.modalDialog(
        {
          title: "Warning!",
          message: "SuperAdmin Role can not be changed!"
        }
      )
    }
    return this.editState = !this.editState,
      this.roleForm.patchValue({
        roleName: this.role.roleName,
        create: this.role.permissions.create,
        update: this.role.permissions.update,
        read: this.role.permissions.read,
        remove: this.role.permissions.remove,
      })
  }

  updateRole(role: Role) {
    this.editState = false
    this.roleService.updateRole(role, this.roleData)
    this.modalDialog(
      {
        title: "Success!",
        message: "Changes has been saved!"
      }
    )
  }

  deleteRole(r: Role) {
    if (r.roleName === 'SuperAdmin') {
      return this.modalDialog(
        {
          title: "Warning!",
          message: "SuperAdmin Role can not be deleted!"
        }
      )
    }
    return this.users$.subscribe(
      users => {
        for (let value of users) {
          if (value.role === r.roleName) {
            return this.modalDialog(
              {
                title: "Warning!",
                message: "We have users with this role!"
              }
            )
          }
        }
        return this.roleService.removeRole(r.id)
      }
    )
  }



  ngOnInit(): void {
  }

}
