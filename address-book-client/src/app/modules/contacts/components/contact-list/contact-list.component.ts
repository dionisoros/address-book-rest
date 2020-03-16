import {Component, OnDestroy, OnInit} from '@angular/core';
import {ContactsService} from "../../../../shared/services/api/contacts-service/contacts.service";
import {Contact} from "../../../../shared/models/contact/contact";
import {Subscription} from "rxjs";
import {NotificationsService} from "../../../../shared/services/common/notifications.service";
import {delay} from "rxjs/operators";

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit, OnDestroy {

  contacts: Contact[] = [];
  displayedColumns = ['firstName', 'lastName', 'email', 'country'];
  isLoadingContacts = true;
  private subscription: Subscription;

  constructor(private contactsService: ContactsService, private notificationsService: NotificationsService) { }

  ngOnInit(): void {
    this.subscription = this.contactsService.getContacts().pipe(delay(400)).subscribe(contacts => {
      this.contacts = contacts;
      this.isLoadingContacts = false;
    }, () => {
      this.notificationsService.error('Could not see contacts', {title: 'Server error'});
      this.isLoadingContacts = false
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
