import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { ActivatedRoute } from '@angular/router';
import { RoleService } from 'src/app/services/role.service';
import { WarningDialogComponent } from '../../post/post-dialogs/warning-dialog/warning-gialog.component';
import { MatDialog } from '@angular/material/dialog';

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
  result: any;
  matDialogConfig = {
    width: 'auto',
    height: 'auto',
    maxHeight: '100vh',
    maxWidth: '94vw',
  };

  constructor(
    private roleService: RoleService,
    private usersService: UsersService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
  }
  
  updateUserNow(id: string | undefined, user: any) {
    this.dialog
      .open(WarningDialogComponent, {
        data: {
          title: 'You want to change your name',
          message: 'Do you confirm the changes?',
          firstButtonText: 'Cancel',
          secondButtonText: 'Confirm',
        },
        ...this.matDialogConfig,
      })
      .afterClosed()
      .subscribe((result: any) => {
        if (result && id !== undefined) {
          this.usersService.updateUserNow(id, user);
        }
      });
  }
  
}
