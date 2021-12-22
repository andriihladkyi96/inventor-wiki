import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
import { ChangesMessageComponent } from '../changes-message/changes-message.component';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})

export class UserProfileComponent implements OnInit {

  user: User;
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private dialog: MatDialog,
    private router: Router
  ) { }
  
  ngOnInit(): void {
    this.user = this.usersService.getCurrentUser();
  }


  updatePassword(password: string) {
    this.authService.updatePassword(password);

  updateUser(id: string | undefined, key: string, value: string) {
    if (id !== undefined) {
      this.usersService.updateUser(id, key, value);
      this.usersService.setCurrentUser(this.user);
      this.dialog.open(ChangesMessageComponent, {
        width: '30%',
        height: '30%',
      });
    }
  }

  updateUserEmail(
    id: string | undefined,
    key: string,
    value: string,
    email: string
  ) {
    if (id !== undefined) {
      this.authService.updateEmail(email);
      this.usersService.updateUser(id, key, value).then(()=> {
      this.usersService.setCurrentUser(this.user);
      this.dialog.open(ChangesMessageComponent, {
        width: '30%',
        height: '30%',
      });
    })
  }
}

  updatePassword(password: string) {
    this.authService.updatePassword(password);
  }

  deleteUserAccount(key: string | undefined) {
    if (key !== undefined) {
      this.authService.deleteAccount(key);
    }
  }
}
