import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsersService } from 'src/app/services/users.service';
import { WarningDialogComponent } from '../../post/post-dialogs/warning-dialog/warning-gialog.component';
import { AddUserFormComponent } from '../add-user-form/add-user-form.component';
@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss'],
  providers: [UsersService],
})
export class UsersPageComponent implements OnInit {
  isActive: boolean;
  matDialogConfig = {
    width: 'auto',
    height: 'auto',
    maxHeight: '100vh',
    maxWidth: '94vw',
  };

  constructor(private usersService: UsersService, private dialog: MatDialog) {}
  users$ = this.usersService.getUsers();

  ngOnInit(): void {}
  showForm() {
    this.dialog.open(AddUserFormComponent, {
      width: 'auto',
      height: 'auto',
      maxHeight: '100vh',
      maxWidth: '94vw',
    
    });
  }

  isActiveToogle(id: string | undefined, value: boolean) {
    if (id !== undefined) {
      this.dialog
        .open(WarningDialogComponent, {
          data: {
            title: "User's changes are expected",
            message: 'Do you confirm the changes?',
            firstButtonText: 'Cancel',
            secondButtonText: 'Confirm',
          },
          ...this.matDialogConfig,
        })
        .afterClosed()
        .subscribe((result) => {
          if (result) {
            {
              this.usersService.updateUser(id, 'isActive', value).then(() => {
                this.isActive = value;
              });
            }
          }
        });
    }
  }
}
