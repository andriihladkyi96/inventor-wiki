import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface warningDialogData {
  title?: string;
  message?: string;
}

@Component({
  selector: 'app-warning',
  templateUrl: './warning-category.component.html',
  styleUrls: ['./warning-category.component.scss']
})
export class WarningCategoryComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: warningDialogData) { }

  ngOnInit(): void {
  }

}
