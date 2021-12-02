import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  title:string;
  message: string;
  firstButtonText:string;
  secondButtonText:string;
}


@Component({
  selector: 'app-warning-dialog',
  templateUrl: './warning-dialog.component.html',
  styleUrls: ['./warning-dialog.component.scss']
})
export class WarningDialogComponent{
  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}
}

