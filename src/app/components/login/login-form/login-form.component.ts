import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthService, private usersService: UsersService, private router: Router) { }

  loginGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)])
  })

  get email() {
    return this.loginGroup.get('email') as FormControl
  }

  get password() {
    return this.loginGroup.get('password') as FormControl
  }
  isFetching: boolean = false
  isError: boolean = false
  errorMessage: string = ''
  subscription: Subscription


  logIn() {
    const { email, password } = this.loginGroup.value
    this.isFetching = true
    this.authService.signIn(email, password)
      .then(
        (u) => {
          this.subscription = this.usersService.getUser(u.user?.uid).subscribe(
            u => {
              if (!u?.isActive) {
                this.authService.signOut()
                this.router.navigate(['login'])
                this.isError = true
                this.errorMessage = 'User is deactivated by Super Admin'
                this.isFetching = false
              } else {
                this.usersService.setCurrentUser(u)
                this.router.navigate(['/'])
                this.isFetching = false
              }
            })
        })
      .catch(
        err => {
          this.password.setValue('')
          this.isError = true
          this.errorMessage = err.message
          this.isFetching = false
        })
  }

  ngOnInit(): void {

  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

}
