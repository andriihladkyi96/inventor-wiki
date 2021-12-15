import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

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

  isError: boolean = false
  errorMessage: string = ''


  logIn() {
    const { email, password } = this.loginGroup.value
    this.authService.signIn(email, password)
      .then(
        (u) => {
          this.usersService.getUser(u.user?.uid).subscribe(
            u => {
              if (!u?.isActive) {
                this.authService.signOut()
                this.isError = true
                this.errorMessage = 'User is deactivated by Super Admin'
              } else {
                this.usersService.setCurrentUser(u)
                this.router.navigate(['/'])
              }
            })
        })
      .catch(
        err => {
          this.password.setValue('')
          this.isError = true
          this.errorMessage = err.message
        })
  }

  ngOnInit(): void {
  }

}
