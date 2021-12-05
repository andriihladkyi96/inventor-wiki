import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Role, Permissions } from 'src/app/models/Role';
import { User } from 'src/app/models/User';
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

  getRole$ = this.roleService.getRole('SuperAdmin')

  show() {
    console.log(this.getRole$);
    
  }

  currentUser: User | undefined


  constructor(private usersService: UsersService, private roleService: RoleService) { }

  roleForm = new FormGroup({
    role: new FormControl(),
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

  createRole() {

    const { role, create, read, update, remove } = this.roleForm.value
    const permissions: Permissions = {
      create,
      read,
      update,
      remove
    }
    const newRole: Role = {
      role,
      permissions: permissions
    }


    if (newRole) {
      console.log('exsist');
      console.log(newRole);
    }

    this.roleService.createRole(newRole)

  }

  onSubmit() {
    console.log(this.roleForm.value);
    this.createRole()
  }

  removeRole() {

  }

  ngOnInit(): void {
    this.currentUser = this.usersService.getCurrentUser()
    this.show()
  }

}
