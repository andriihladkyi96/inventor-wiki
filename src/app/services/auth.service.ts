import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { from, Observable } from 'rxjs';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private auth: AngularFireAuth, private router: Router, private usersService: UsersService) { }



  signIn(email: string, password: string) {
    return from(this.auth.signInWithEmailAndPassword(email, password)
      .then(
        (u) => {
          this.usersService.getUser(u.user?.uid).subscribe(
            u => {
              this.usersService.setCurrentUser(u)
              this.router.navigate(['/'])
            }
          )
        }))

  }

  signInAsGuest() {
    this.auth.signInAnonymously()
      .then(() => {
        this.router.navigate(['/'])
      })
  }

  signOut() {
    this.auth.signOut()
      .then(() => this.router.navigate(['login']))
  }

  registerUser(email: string, password: string): Observable<any> {
    return from(this.auth.createUserWithEmailAndPassword(email, password))
  }
}
