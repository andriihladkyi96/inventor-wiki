import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }


  resetGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  })


  get email() {
    return this.resetGroup.get('email') as FormControl
  }
  isDone: boolean = false
  isError: boolean = false
  errorMessage: string = ''

  SendForReset() {

    this.authService.resetPassword(this.email.value)
      .then(
        () => this.isDone = true)
      .catch(
        (err) => {
          this.isError = true
          this.errorMessage = err.message
        }
      )
  }

  ngOnInit(): void {
  }

}
