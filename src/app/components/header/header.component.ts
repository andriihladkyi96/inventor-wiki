import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { UsersService } from "../../services/users.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  hidenButton: boolean = false;

  constructor(private usersService: UsersService, private authService: AuthService, public router: Router) { }

  get currentUserNme() {
    return this.usersService.getCurrentUser().firstName
  }

  get isSuperAdmin(): boolean {
    return this.usersService.checkUserRole() === "SuperAdmin"
  }

  get isGuest(): boolean {
    return this.usersService.checkUserRole()
  }

  logOut() {
    this.authService.signOut()
    localStorage.removeItem('currentUser')
  }

  ngOnInit(): void {
    console.log('header');
  }
}
