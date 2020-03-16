import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'address-book-client';

  notificationOptions = {
    position: ['bottom', 'right'],
    lastOnBottom: true,
    timeOut: 3000,
    showProgressBar: false,
    pauseOnHover: true,
    clickToClose: true,
    maxStack: 1,
    maxLength: 0
  };
}
