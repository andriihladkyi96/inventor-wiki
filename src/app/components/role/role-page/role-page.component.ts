import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RoleService } from 'src/app/services/role.service';
import { UsersService } from 'src/app/services/users.service';
import { CreateRoleFormComponent } from '../create-role-form/create-role-form.component';
import { Router } from "@angular/router";
import { Role } from 'src/app/models/Role';

@Component({
  selector: 'app-role-page',
  templateUrl: './role-page.component.html',
  styleUrls: ['./role-page.component.scss']
})
export class RolePageComponent implements OnInit {
  allRoles: Role[];

  
  roles$ = this.roleService.getAllRoles()

  constructor(private dialog: MatDialog, private usersService: UsersService, private roleService: RoleService, public router: Router) { }

  showCrateForm() {
    this.dialog.open(CreateRoleFormComponent)
    this.router.events.subscribe(() => {
      this.dialog.closeAll();
    })
  }

  ngOnInit(): void {
    this.roleService.getAllRoles().subscribe(value => this.allRoles = value)
  }

}
