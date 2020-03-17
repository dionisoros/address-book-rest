import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService, TokenResponse} from "../../../../shared/services/api/auth-service/auth.service";
import {NotificationsService} from "../../../../shared/services/common/notifications.service";
import {HttpErrorResponse} from "@angular/common/http";
import {map, switchMap, switchMapTo} from "rxjs/operators";
import {UserManagementService} from "../../../../shared/services/api/user-service/user-management.service";
import {empty} from "rxjs";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  fadeIn = false;

  signUpForm: FormGroup;
  signInObj = {
    username: new FormControl('', [Validators.required, Validators.nullValidator]),
    password: new FormControl('', [Validators.required, Validators.nullValidator])
  };

  constructor(
    private authService: AuthService,
    private userService: UserManagementService,
    private notificationsService: NotificationsService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.signUpForm = this.initSignUpForm()
  }

  initSignUpForm(): FormGroup {
    return this.formBuilder.group({
      firstName: [null, Validators.maxLength(30)],
      lastName: [null, Validators.maxLength(30)],  // not necessary new FormControl() because is already!
      username: [null, Validators.compose([
        Validators.required,
        Validators.maxLength(30),
      ])],
      age: [null, Validators.compose([
        Validators.maxLength(30),
      ])],
      email: [null, Validators.compose([
        Validators.required,
        Validators.email,
        Validators.maxLength(40),
      ])],
      password: [null, Validators.compose([
        Validators.required,
        Validators.maxLength(40)
      ])]
    })
  }

  signIn() {
    this.authService.signIn({username: this.signInObj.username.value, password: this.signInObj.password.value})
      .subscribe((tokenResponse: TokenResponse) => {
        this.authService.setLocalUserInfo(tokenResponse, this.signInObj.username.value);
        this.router.navigate(['/contacts']);
        this.notificationsService.success('Logged in.');
      })
  }

  onSubmit() {
    this.authService.signUp(this.signUpForm.value)
      .subscribe((tokenResponse: TokenResponse) => {
        this.fadeIn = !this.fadeIn;

        // set SignIn form with signUp values
        this.signInObj.username.setValue(this.signUpForm.get('username').value);
        this.signInObj.password.setValue(this.signUpForm.get('password').value);

        this.notificationsService.success('Registration completed successfully. You can sign in now.');
        this.initSignUpForm();
      })
  }
}
