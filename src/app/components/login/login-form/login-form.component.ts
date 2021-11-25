import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  // loginGroup = this.fb.group({
  //   email: '',
  //   password: ''
  // })

  loginGroup = new FormGroup({
    email: new FormControl(' '),
    password: new FormControl('')
  })

  ngOnInit(): void {

  }

}
