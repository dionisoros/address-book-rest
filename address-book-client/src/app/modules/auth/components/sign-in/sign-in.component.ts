import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService, TokenResponse} from "../../../../shared/services/api/auth-service/auth.service";
import {NotificationsService} from "../../../../shared/services/common/notifications.service";
import {UserManagementService} from "../../../../shared/services/api/user-service/user-management.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  fadeIn = false;

  signUpForm: FormGroup;
  signInObj = {
    username: new FormControl('', [Validators.compose([
      Validators.required,
      Validators.maxLength(30),
      Validators.minLength(2),
      Validators.pattern(new RegExp("\\S"))
    ])]),
    password: new FormControl('', [Validators.compose([
      Validators.required,
      Validators.maxLength(30),
    ])])
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
      firstName: [null, Validators.compose([
        Validators.maxLength(30),
        Validators.minLength(2),
        Validators.pattern(new RegExp("\\S"))
      ])],
      lastName: [null, Validators.compose([
        Validators.maxLength(30),
        Validators.minLength(2),
        Validators.pattern(new RegExp("\\S"))
      ])],  // not necessary new FormControl() because is already!
      username: [null, Validators.compose([
        Validators.required,
        Validators.maxLength(30),
        Validators.minLength(2),
        Validators.pattern(new RegExp("\\S"))
      ])],
      age: [null, Validators.compose([
        Validators.minLength(1),
        Validators.maxLength(3),
        Validators.pattern(new RegExp("\\S")),
        Validators.pattern("^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$")
      ])],
      email: [null, Validators.compose([
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        Validators.maxLength(30),
        Validators.pattern(new RegExp("\\S"))
      ])],
      password: [null, Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(30),
        Validators.pattern(new RegExp("\\S"))
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
