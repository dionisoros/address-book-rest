import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {delay, distinctUntilChanged, map, startWith, switchMap, takeUntil} from "rxjs/operators";
import {ContactsService} from "../../../../shared/services/api/contacts-service/contacts.service";
import {Contact} from "../../../../shared/models/contact/contact";
import {Observable, Subject} from "rxjs";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NotificationsService} from "../../../../shared/services/common/notifications.service";
import {MatDialog} from "@angular/material/dialog";
import {CustomConfirmDialogComponent} from "../../../../shared/components/custom-confirm-dialog/custom-confirm-dialog.component";

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss']
})
export class ContactEditComponent implements OnInit, OnDestroy {

  private _unsubscribe: Subject<void> = new Subject();
  contactForm: FormGroup;
  countryListFiltered: Observable<string[]>;
  isLoading = true;
  private countryList: string[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private contactsService: ContactsService,
    private notificationsService: NotificationsService,
    private matDialog: MatDialog,
    private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.countryList = this.contactsService.getCountries();
    this.populateContactForm();
    this.countryListFiltered = this.contactForm.get('country').valueChanges
      .pipe(startWith(''), map(value => {
        return this.filterCountries(value)
      }));
  }

  private populateContactForm(): void {

    this.contactForm = this.formBuilder.group({
      'firstName': [null, Validators.required],
      'lastName': [null, Validators.required],
      'email': [null, Validators.required],
      'country': [null, Validators.required],
      '_id': [null, Validators.required],
    });

    this.route.params.pipe(
      distinctUntilChanged(),
      switchMap(params => {
        return this.contactsService.getContactById(params.id);
      }), delay(500), takeUntil(this._unsubscribe)) // in order to simulate the mat spinner
      .subscribe((contact: Contact) => {
        this.contactForm.setValue(new Contact(contact));
        this.isLoading = false;
      }, () => {
        this.isLoading = false;
        this.notificationsService.error('Could not see details about requested contact.');
        this.router.navigate(['/contacts']);
      });
  }

  editContact() {
    const contactForm = new Contact(this.contactForm.value);
    this.contactsService.updateContact(contactForm).subscribe((contact) => {
      this.router.navigate(['/contacts']);
      this.notificationsService.success(`${contact.firstName} updated.`)
    }, () => {
      this.notificationsService.error(`${contactForm.firstName} could not be updated`)
    })
  }

  removeContact() {
    const contactForm = this.contactForm.value;
    const confirmDeleteDialog =  this.matDialog.open(CustomConfirmDialogComponent, {
      data: {
        title: `Are you sure you want to delete ${contactForm.firstName}?`,
      }
    });
    confirmDeleteDialog.afterClosed().subscribe(confirm => {
      if (confirm) {
        this.contactsService.deleteContact(contactForm._id).subscribe(() => {
          this.router.navigate(['/contacts']);
          this.notificationsService.success(`${contactForm.firstName} was removed.`)
        }, () => {
          this.notificationsService.error(`${contactForm.firstName} couldn't be removed`)
        })
      }
    })
  }

  private filterCountries(value: string): string[] {
    return this.countryList.filter(country => country.includes(value));
  }

  ngOnDestroy() {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }
}
