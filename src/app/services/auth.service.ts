import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth, private router: Router, private usersService: UsersService) { }

  signIn(email: string, password: string) {
    return this.auth.signInWithEmailAndPassword(email, password)
  }

  signOut() {
    this.auth.signOut()
      .then(() => {
        localStorage.removeItem('currentUser')
      })
  }

  registerUser(email: string, password: string) {
    return this.auth.createUserWithEmailAndPassword(email, password)
  }

  deleteAccount(id: string) {
    this.auth.currentUser.then(
      (u) => {
        this.usersService.deleteUser(id)
        localStorage.removeItem('currentUser')
        u?.delete()
        this.router.navigate(['/login'])
      }
    )
  }

  updateEmail(email: string) {
    return from(this.auth.currentUser.then(
      (u) => u?.updateEmail(email)))
  }

  updatePassword(password: string) {
    return from(this.auth.currentUser.then(
      (u) => u?.updatePassword(password)))
  }

  resetPassword(email: string) {
    return this.auth.sendPasswordResetEmail(email)
  }

}
