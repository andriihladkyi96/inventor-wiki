import {Component, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface warningDialogData {
  title?: string;
  message?: string;
}

@Component({
  selector: 'app-warning',
  templateUrl: './warning.component.html',
  styleUrls: ['./warning.component.scss']
})
export class WarningComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: warningDialogData) { }

  ngOnInit(): void {
  }

}
