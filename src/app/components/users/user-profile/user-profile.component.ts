import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/models/User';
import { UsersService } from 'src/app/services/users.service';
import { ChangesMessageComponent } from '../changes-message/changes-message.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  id: string = "";
  user: User ;
  constructor(private usersService: UsersService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.user = this.usersService.getCurrentUser()
    this.id = this.user.id as string;

  }
  

updateUser(id: string | undefined, key: string, value: string) {
  if (id !==undefined) {
    this.usersService.updateUser(id, key, value) 
    this.usersService.setCurrentUser(this.user)
    this.dialog.open(ChangesMessageComponent,
      {
        width: '30%',
        height: '30%'
        
      });
  }
  
}


}
