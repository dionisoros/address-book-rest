import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-custom-confirm-dialog',
  templateUrl: './custom-confirm-dialog.component.html',
  styleUrls: ['./custom-confirm-dialog.component.scss']
})
export class CustomConfirmDialogComponent implements OnInit {

  title: string;
  message: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {title, message}) {
    this.title = data.title;
    this.message = data.message;
  }

  ngOnInit() {
  }

}
