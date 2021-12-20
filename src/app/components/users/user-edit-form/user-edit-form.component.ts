import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { ChangesMessageComponent } from '../changes-message/changes-message.component';
import { MatDialog } from '@angular/material/dialog';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-user-edit-form',
  templateUrl: './user-edit-form.component.html',
  styleUrls: ['./user-edit-form.component.scss'],
})
export class UserEditFormComponent implements OnInit {
  id = this.route.snapshot.paramMap.get('id') as string;
  user = this.usersService.getUser(this.id);
  isActive: boolean;
  roles$ = this.roleService.getAllRoles();
  role: string;
  
  

  constructor(
    private roleService: RoleService,
    private usersService: UsersService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') as string;
    console.log(this.roles$);
  }
  updateUser(id: string | undefined, key: string, value: string) {
    if (id !== undefined) {
      this.usersService.updateUser(id, key, value);
      this.dialog.open(ChangesMessageComponent, {
        width: '30%',
        height: '30%',
      });
    }
  }
}
