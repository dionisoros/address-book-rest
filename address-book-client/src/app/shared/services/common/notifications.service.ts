import {Injectable} from '@angular/core';
import {NotificationsService as Angular2NotificationsService} from 'angular2-notifications';

class NotificationOptions {
  title: string = null;
}

@Injectable()
export class NotificationsService {

  constructor(private notificationsService: Angular2NotificationsService) {
  }

  public success(msg: string, options: NotificationOptions = new NotificationOptions()): void {
    this.notificationsService.success(options.title || 'Success!', msg, {timeOut: 3000, showProgressBar: false, theClass: 'notification-success-message'});
  }

  public error(msg: string, options: NotificationOptions = new NotificationOptions()): void {
    this.notificationsService.error(options.title || 'Error!', msg, {timeOut: 5000, showProgressBar: false, theClass: 'notification-error-message'});
  }

  public info(msg: string, options: NotificationOptions = new NotificationOptions()): void {
    this.notificationsService.info(options.title || 'Info', msg, {timeOut: 3000, showProgressBar: false, theClass: 'notification-info-message'});
  }

}
