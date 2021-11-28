import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '@firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public auth: AngularFireAuth, public router: Router) { }

  signIn(email: string, password: string) {
    this.auth.signInWithEmailAndPassword(email, password)
      .then(
        () => {
          this.router.navigate(['/'])
        }).catch(err => console.log(err))
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

  registerUser(email: string, password: string) {
    this.auth.createUserWithEmailAndPassword(email, password)
  }
}
