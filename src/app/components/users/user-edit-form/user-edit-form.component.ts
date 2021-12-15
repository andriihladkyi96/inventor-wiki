import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ChangesMessageComponent } from '../changes-message/changes-message.component';
import { MatDialog } from '@angular/material/dialog';

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
    private location: Location,
    private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') as string;
      this.usersService.getUser(this.id).subscribe(
        (u) => this.user  = u
      )
  }


  updateUser(id: string | undefined, key: string, value: string) {
    if (id !==undefined) {
      this.usersService.updateUser(id, key, value) 
      this.dialog.open(ChangesMessageComponent,
        {
          width: '500px',
          data: 'Your changes sucsses',
        });
    }
    
  }

  goBack() {
    this.location.back();
  }

}
