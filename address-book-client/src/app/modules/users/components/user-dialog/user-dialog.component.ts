import { Component, OnInit } from '@angular/core';
import {User} from "../../../../shared/models/user/user.model";
import {MatDialogRef} from "@angular/material/dialog";

// Have 2 inputs with some simple validation (like an email validation) without the require
// of angular-forms and ngModel

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit {

  user: User =  new User();
  validEmail: boolean = true;
  validAge: boolean = true;

  constructor(private dialogRef: MatDialogRef<UserDialogComponent>) { }

  ngOnInit() {}

  close() {
    this.dialogRef.close();
  }

  onEmailChange(value: string) { // custom validation (without material)
    this.validEmail = RegExp(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/).test(value);
    this.user.email = value;
  }

  onAgeChange(value: string) { // custom validation (without material)
    this.validAge = RegExp(/^[1-9][0-9]*$/).test(value);
    this.user.age = Number(value);
  }

  save() {
    this.dialogRef.close(this.user);
  }
}
