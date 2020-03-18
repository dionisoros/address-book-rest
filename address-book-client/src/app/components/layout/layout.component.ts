import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {NotificationsService} from "../../shared/services/common/notifications.service";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {

  theme: string;
  userLoggedIn: string = localStorage.getItem('userLoggedIn');

  constructor(private router: Router, private notificationService: NotificationsService) { }

  signOut() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userLoggedIn');
    this.router.navigate(['/sign-in']);
    this.notificationService.info('You are logged out')
  }

}
