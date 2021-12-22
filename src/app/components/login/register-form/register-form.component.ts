import { Component, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit, OnDestroy {

  identityRevealedValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    return password && confirmPassword && password.value !== confirmPassword.value ? { identityNotRevealed: true } : null;
  };


  constructor(private authService: AuthService, private usersService: UsersService, private router: Router) {

  }

  registerForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20), Validators.pattern('[a-zA-Z-]+$')]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(20), Validators.pattern('[a-zA-Z-]+$')]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
  }, { validators: this.identityRevealedValidator })

  get firstName() {
    return this.registerForm.get('firstName') as FormControl
  }

  get lastName() {
    return this.registerForm.get('lastName') as FormControl
  }

  get email() {
    return this.registerForm.get('email') as FormControl
  }

  get password() {
    return this.registerForm.get('password') as FormControl
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword') as FormControl
  }

  isFetching: boolean = false
  isError: boolean = false
  errorMessage: string = ''
  subscription: Subscription

  createUser() {
    this.isFetching = true
    const { email, password, firstName, lastName } = this.registerForm.value
    const user: User = {
      email,
      firstName,
      lastName,
      role: 'User',
      isActive: true
    }

    this.authService.registerUser(email, password).then(
      (u) => {
        user.id = u.user?.uid
        this.usersService.addUser(user)
        this.authService.signIn(email, password).then(
          (u) => {
            this.usersService.getUser(u.user?.uid).subscribe(
              (u) => {
                this.usersService.setCurrentUser(u)
                this.router.navigate(['/'])
                this.isFetching = false
              }
            )
          }
        )
      }).catch(
        (err) => {
          this.isError = true
          this.errorMessage = err.message
          this.isFetching = false
        }
      )

  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

}
