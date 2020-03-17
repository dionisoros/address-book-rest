import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ContactsService} from "../../../../shared/services/api/contacts-service/contacts.service";
import {Contact} from "../../../../shared/models/contact/contact";
import {Subscription} from "rxjs";
import {NotificationsService} from "../../../../shared/services/common/notifications.service";
import {delay} from "rxjs/operators";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {animate, style, transition, trigger} from "@angular/animations";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({opacity: 0}),
        animate('1000ms ease-in' )
      ]),
      transition(':leave',
        animate(1000, style({opacity: 1})))
    ])
  ]
})
export class ContactListComponent implements OnInit, OnDestroy {

  contacts: MatTableDataSource<Contact> = new MatTableDataSource();
  displayedColumns = ['firstName', 'lastName', 'email', 'country', 'createdAt', 'createdBy', 'updatedAt', 'updatedBy'];
  isLoadingContacts = true;
  private subscription: Subscription;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private contactsService: ContactsService, private notificationsService: NotificationsService) {}

  ngOnInit(): void {
    this.subscription = this.contactsService.getContacts().pipe(delay(400)).subscribe(contacts => {
      this.contacts = new MatTableDataSource(contacts);
      this.contacts.paginator = this.paginator;
      this.contacts.sort = this.sort;
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
