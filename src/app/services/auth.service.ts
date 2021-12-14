import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { updateEmail, updatePassword, deleteUser } from '@angular/fire/auth'
import { Router } from '@angular/router';
import { from, Observable } from 'rxjs';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth, private router: Router, private usersService: UsersService) { }

  currentUser = this.auth.currentUser

  signIn(email: string, password: string) {
    return from(this.auth.signInWithEmailAndPassword(email, password)
      .then(
        (u) => {
          this.usersService.getUser(u.user?.uid).subscribe(
            u => {
              if (!u?.isActive) {
                this.signOut()
                alert('User is deactivated')
              }
              this.usersService.setCurrentUser(u)
              this.router.navigate(['/'])
              this.currentUser = this.auth.currentUser
            })
        })
    )
  }

  signOut() {
    this.auth.signOut()
      .then(() => { this.router.navigate(['login']) }
      )
  }

  registerUser(email: string, password: string): Observable<any> {
    return from(this.auth.createUserWithEmailAndPassword(email, password))
  }

  deleteAccount(id: string) {
    this.currentUser.then(
      (u) => {
        u?.delete()
        this.usersService.deleteUser(id)
        this.signOut()
      }
    )
  }

  updateEmail(email: string) {
    return from(this.currentUser.then(
      (u) => u?.updateEmail(email)))
  }

  updatePassword(password: string) {
    return from(this.currentUser.then(
      (u) => u?.updatePassword(password)))
  }

  resetPassword(email: string) {
    return this.auth.sendPasswordResetEmail(email)
  }

}
