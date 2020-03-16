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

  constructor(private router: Router, private notificationService: NotificationsService) { }

  signOut() {
    localStorage.removeItem('authToken');
    this.router.navigate(['/sign-in']);
    this.notificationService.info('You are logged out')
  }

}
