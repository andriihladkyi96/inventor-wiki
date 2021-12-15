import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/models/User';
import { UsersService } from 'src/app/services/users.service';
import { RegisterFormComponent } from '../../login/register-form/register-form.component';
@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss'],
   providers: [UsersService]
})
export class UsersPageComponent implements OnInit {
public  users:User[] = [];

  constructor( private usersService: UsersService,
    private dialog: MatDialog) {
  }
  users$ = this.usersService.getUsers()

  ngOnInit(): void {
  }
  showForm(){
    this.dialog.open(RegisterFormComponent,
      {
        width: '500px',
      
      });
  }
}

  
