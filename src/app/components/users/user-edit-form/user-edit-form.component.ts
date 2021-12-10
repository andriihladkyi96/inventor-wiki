import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-edit-form',
  templateUrl: './user-edit-form.component.html',
  styleUrls: ['./user-edit-form.component.scss']
})
export class UserEditFormComponent implements OnInit {
  id: string = "";
  user: User | undefined;

  identityRevealedValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    return password && confirmPassword && password.value !== confirmPassword.value ? { identityNotRevealed: true } : null;
  };

  constructor(private authService: AuthService, 
    private usersService: UsersService,
    private route: ActivatedRoute,
    private location: Location) {
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


  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') as string;
      this.usersService.getUser(this.id).subscribe(
        (u) => this.user  = u
      )
  }


  updateUser(id: string | undefined, key: string, value: string) {
    if (id !==undefined) {
      this.usersService.updateUser(id, key, value) 
    }
    
  }

  goBack() {
    this.location.back();
  }

}
