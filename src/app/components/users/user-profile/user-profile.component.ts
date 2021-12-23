import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { WarningDialogComponent } from '../../post/post-dialogs/warning-dialog/warning-gialog.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  user: User;
  matDialogConfig = {
    width: 'auto',
    height: 'auto',
    maxHeight: '100vh',
    maxWidth: '94vw',
  };

  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.user = this.usersService.getCurrentUser();
  }

  updateUserNow(id: string | undefined, user: User) {
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
      .subscribe((result) => {
        if (result && id !== undefined) {
          this.usersService.updateUserNow(id, user);
          this.usersService.setCurrentUser(this.user);
        }
      });
  }

  updateUserEmail(
    id: string | undefined,
    key: string,
    value: string,
    email: string
  ) {
    this.dialog
      .open(WarningDialogComponent, {
        data: {
          title: 'You want to change your email',
          message: 'Do you confirm the changes?',
          firstButtonText: 'Cancel',
          secondButtonText: 'Confirm',
        },
        ...this.matDialogConfig,
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          if (id !== undefined) {
            this.authService.updateEmail(email);
            this.usersService.updateUser(id, key, value).then(() => {
              this.usersService.setCurrentUser(this.user);
            });
          }
        }
      });
  }

  updatePassword(password: string) {
    this.dialog
      .open(WarningDialogComponent, {
        data: {
          title: 'You want to change your password',
          message: 'Do you confirm the changes?',
          firstButtonText: 'Cancel',
          secondButtonText: 'Confirm',
        },
        ...this.matDialogConfig,
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.authService.updatePassword(password);
        }
      });
  }

  deleteUserAccount(key: string | undefined) {
    if (key !== undefined) {
      this.dialog

        .open(WarningDialogComponent, {
          data: {
            title: 'You are about to delete your account',
            message: 'Delete this profile?',
            firstButtonText: 'Cancel',
            secondButtonText: 'Confirm',
          },
          ...this.matDialogConfig,
        })
        .afterClosed()
        .subscribe((result) => {
          if (result) {
            this.authService.deleteAccount(key);
            this.router.navigate(['/']);
          }
        });
    }
  }
}