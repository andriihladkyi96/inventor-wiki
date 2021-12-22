import { Component, HostBinding, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { UsersService } from "../../services/users.service";
import { Router } from "@angular/router";
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  hidenButton: boolean = false;
  currentUser?: User;
  isOpen: boolean 

  constructor(private usersService: UsersService, private authService: AuthService, public router: Router) { }

  toggle(value: boolean) {    
    return this.isOpen = value
  }

  get currentUserNme() {
    return this.usersService.getCurrentUser().firstName
  }

  get isSuperAdmin(): boolean {
    if (!this.usersService.getCurrentUser()) {
      return false
    }
    return this.usersService.getCurrentUser().role === "SuperAdmin"
  }

  get isGuest(): boolean {
    return this.usersService.checkUserRole()
  }

  logOut() {
    this.authService.signOut()
    
  }

  ngOnInit(): void {
  }
}
