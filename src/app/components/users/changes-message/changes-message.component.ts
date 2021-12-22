import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-changes-message',
  templateUrl: './changes-message.component.html',
  styleUrls: ['./changes-message.component.scss'],
})
export class ChangesMessageComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<ChangesMessageComponent>) {}

  ngOnInit(): void {
   
  }

  
}
