import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/models/User';
import { UsersService } from 'src/app/services/users.service';
import { AddUserFormComponent } from '../add-user-form/add-user-form.component';
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
    this.dialog.open(AddUserFormComponent,
      {
        width: '800px',
        height: '800px'
      
      });
  }
}

  
