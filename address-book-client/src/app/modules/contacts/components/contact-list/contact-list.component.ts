import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ContactsService} from "../../../../shared/services/api/contacts-service/contacts.service";
import {Contact} from "../../../../shared/models/contact/contact";
import {BehaviorSubject, Subject} from "rxjs";
import {NotificationsService} from "../../../../shared/services/common/notifications.service";
import {switchMap, takeUntil, tap} from "rxjs/operators";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {animate, style, transition, trigger} from "@angular/animations";
import {MatPaginator} from "@angular/material/paginator";
import {CustomConfirmDialogComponent} from "../../../../shared/components/custom-confirm-dialog/custom-confirm-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {sortingHeaderByLowerCase} from "../../../../shared/utils/helper-functions/sorting-header-by-lower-case";

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
  displayedColumns = ['firstName', 'lastName', 'email', 'country', 'createdAt', 'createdBy', 'updatedAt', 'updatedBy', 'edit'];
  isLoadingContacts: boolean;
  private _contactListSubject$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  private _unsubscribe: Subject<void> = new Subject<void>();

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private contactsService: ContactsService,
    private notificationsService: NotificationsService,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this._contactListSubject$.pipe(
      tap(() => (this.isLoadingContacts = true)),
      switchMap(() => {
        return this.contactsService.getContacts()
      }),
      tap((contacts: Contact[]) => {
        this.contacts = new MatTableDataSource(contacts);
        this.contacts.paginator = this.paginator;
        this.contacts.sort = this.sort;
        this.contacts.sortingDataAccessor = (data: any, sortHeaderId: string) => sortingHeaderByLowerCase(data, sortHeaderId);
        this.isLoadingContacts = false;
      }, () => {
        this.notificationsService.error('Could not see contacts', {title: 'Server error'});
        this.isLoadingContacts = false
      }),
      takeUntil(this._unsubscribe)
    ).subscribe();
  }

  removeContact(contact: Contact) {
    const confirmDeleteDialog =  this.matDialog.open(CustomConfirmDialogComponent, {
      data: {
        title: `Are you sure you want to delete ${contact.firstName + ' ' + contact.lastName}?`,
      }
    });
    confirmDeleteDialog.afterClosed().subscribe(confirm => {
      if (confirm) {
        this.contactsService.deleteContact(contact._id).subscribe(() => {
          this._contactListSubject$.next(true);
          this.notificationsService.success(`${contact.firstName + ' ' + contact.lastName} was removed.`)
        }, () => {
          this.notificationsService.error(`${contact.firstName + ' ' + contact.lastName} couldn't be removed`)
        })
      }
    })
  }

  ngOnDestroy() {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }
}
