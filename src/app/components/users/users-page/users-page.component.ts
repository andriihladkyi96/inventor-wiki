import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';
@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.scss'],
  providers: [UsersService]
})
export class UsersPageComponent implements OnInit {
  public isShowForm: boolean = false;
  public users: User[] = [];
  public showForm(): void {
    this.isShowForm = true;
  }

  identityRevealedValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    return password && confirmPassword && password.value !== confirmPassword.value ? { identityNotRevealed: true } : null;
  };

  constructor(private authService: AuthService, private usersService: UsersService,
    private router: Router,
    private route: ActivatedRoute) {

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

  isError: boolean = false
  errorMessage: string = ''

  createUser() {

    const { email, password, firstName, lastName } = this.registerForm.value
    const user: User = {
      email,
      firstName,
      lastName,
      role: 'User',
      isActive: true
    }

    this.authService.registerUser(email, password).subscribe(
      (u) => {
        user.id = u.user?.uid
        this.usersService.addUser(user)
      },
      (err) => {
        this.isError = true
        this.errorMessage = err.message
      }
    )

  }

  users$ = this.usersService.getUsers()


  ngOnInit(): void {
  }

}


