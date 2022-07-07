import { Component, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-warning',
  templateUrl: './warning.component.html',
  styleUrls: ['./warning.component.css']
})
export class WarningComponent {
  @Input() warning: string;
  constructor(public dialogRef: MatDialogRef<WarningComponent>) { }

  closeDialog(){
    this.dialogRef.close()
  }
}
