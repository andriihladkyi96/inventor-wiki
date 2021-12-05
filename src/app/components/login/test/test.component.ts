import { Component, OnInit } from '@angular/core';
import { Observable, ObservedValueOf } from 'rxjs';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {


  constructor(private authService: AuthService, private usersService: UsersService) {
  }

  users$ = this.usersService.getUsers()

  currentUser: User | undefined

  ngOnInit(): void {
    this.currentUser = this.usersService.getCurrentUser()
  }

  logOut() {
    this.authService.signOut()
  }

  get isSuperAdmin(): boolean {
    return this.usersService.getUserRole("SuperAdmin")
  }

}
