import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/models/User';
import { UsersService } from 'src/app/services/users.service';
import { AddUserFormComponent } from '../add-user-form/add-user-form.component';
import { ChangesMessageComponent } from '../changes-message/changes-message.component';
@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss'],
  providers: [UsersService],
})
export class UsersPageComponent implements OnInit {
  users: User[] = [];
  id: string | undefined;
  isActive: boolean;

  constructor(private usersService: UsersService, private dialog: MatDialog) {}
  users$ = this.usersService.getUsers();

  ngOnInit(): void {}
  showForm() {
    this.dialog.open(AddUserFormComponent, {
      width: '800px',
      height: '800px',
    });
  }

  isActiveToogle(id: string | undefined, value: boolean) {
    if (id !== undefined) {
      this.usersService.updateUser(id, 'isActive', value).then(() => {
        this.isActive = value;
        this.dialog.open(ChangesMessageComponent, {
          width: '30%',
          height: '30%',
        });
      });
    }

    this.authService.registerUser(email, password).then(
      (u) => {
        user.id = u.user?.uid
        this.usersService.addUser(user)
      }
    ).catch(
      (err) => {
        this.isError = true
        this.errorMessage = err.message
      }
    )

  }
}
