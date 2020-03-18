import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {
  ageValidation,
  emailValidation,
  nameValidation,
  whiteSpaces
} from "../../../../shared/utils/validators/patterns-validation";

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.scss']
})
export class UserDialogComponent implements OnInit {

  userForm: FormGroup;

  constructor(private dialogRef: MatDialogRef<UserDialogComponent>, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      firstName: [null, Validators.compose([
        Validators.maxLength(40),
        Validators.minLength(2),
        Validators.pattern(nameValidation)
      ])],
      lastName: [null, Validators.compose([
        Validators.maxLength(40),
        Validators.minLength(2),
        Validators.pattern(nameValidation),
      ])],  // not necessary new FormControl() because is already!
      username: [null, Validators.compose([
        Validators.required,
        Validators.maxLength(40),
        Validators.minLength(2),
        Validators.pattern(whiteSpaces)
      ])],
      email: [null, Validators.compose([
        Validators.required,
        Validators.pattern(emailValidation),
        Validators.maxLength(100),
        Validators.pattern(whiteSpaces)
      ])],
      age: [null, Validators.compose([
        Validators.minLength(1),
        Validators.maxLength(3),
        Validators.pattern(whiteSpaces),
        Validators.pattern(ageValidation)
      ])],
      password: [null, Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(30),
        Validators.pattern(whiteSpaces)
      ])]
    })
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close(this.userForm.value);
  }
}
