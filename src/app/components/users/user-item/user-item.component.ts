import { Component, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/models/User';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss']
})
export class UserItemComponent implements OnInit {
@Input() user: User;
@Output() isActiveToggle = new EventEmitter
isSuperAdmin: boolean
  constructor() { }

  ngOnInit(): void {
    this.isSuperAdmin = this.user.role === 'SuperAdmin'
  }
  onToggle( isActive: boolean) {
    this.isActiveToggle.emit(isActive)
  }
}
