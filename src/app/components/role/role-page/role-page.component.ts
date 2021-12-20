import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Role, Permissions } from 'src/app/models/Role';
import { RoleService } from 'src/app/services/role.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-role-page',
  templateUrl: './role-page.component.html',
  styleUrls: ['./role-page.component.scss']
})
export class RolePageComponent implements OnInit {

  users$ = this.usersService.getUsers()
  roles$ = this.roleService.getAllRoles()
  hideChangeForm = false
  currentRoleItem: Role

  constructor(private usersService: UsersService, private roleService: RoleService) { }

  roleForm = new FormGroup({
    roleName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    create: new FormControl(false),
    read: new FormControl(false),
    update: new FormControl(false),
    remove: new FormControl(false),
  })

  get role() {
    return this.roleForm.get('role') as FormControl
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
    const { roleName, create, read, update, remove } = this.roleForm.value
    const permissions: Permissions = {
      create,
      read,
      update,
      remove
    }
    const newRole: Role = {
      roleName,
      permissions: permissions
    }
    return newRole
  }

  createNewRole() {
    this.roleService.createRole(this.roleData)
  }

  editRole(r: Role) {
    if (r.roleName === 'SuperAdmin') {
      return alert('SuperAdmin Role can not be changed!')
    }
    this.hideChangeForm = !this.hideChangeForm;
    return this.currentRoleItem = r
  }

  updateRole() {
    this.hideChangeForm = !this.hideChangeForm;
    this.roleService.updateRole(this.currentRoleItem, this.roleData)
  }

  deleteRole(r: Role) {
    this.roleService.removeRole(r.id, r.roleName)
  }

  ngOnInit(): void { }

}
