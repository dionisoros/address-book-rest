import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ContactListComponent} from './contact-list.component';
import {ContactsService} from "../../../../shared/services/api/contacts-service/contacts.service";
import {NotificationsService} from "../../../../shared/services/common/notifications.service";
import {NO_ERRORS_SCHEMA} from "@angular/core";
import {Subject} from "rxjs";
import {SharedModule} from "../../../../shared/shared.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

const MOCK_CONTACTS_RESPONSE = [
  {
    firstName: "DIONIS-ALEXANDRU",
    lastName: "OROS",
    email: "dionis.oros@gmail.com",
    country: "Afghanistan",
    createdAt: "Mar 16, 2020, 8:17:42 PM",
    updatedAt: "Mar 16, 2020, 8:17:42 PM",
    createdBy: "usernametest",
    updatedBy: "usernametest",
    _id: "3F8bacZVPNrKSbnA"
  },
  {
    firstName: "User1",
    lastName: "User1 ln",
    email: "user@gmail.com",
    country: "Antigua and Barbuda",
    createdAt: "Mar 16, 2020, 8:07:11 PM",
    updatedAt: "Mar 16, 2020, 8:07:11 PM",
    createdBy: "usernametest",
    updatedBy: "usernametest",
    _id: "kFukb3aAaEFsScnv"
  }
] as any;

class MockContactsService {
  getContacts() {
  }
}

class MockNotificationsService {
  error(msg, title) {}
}

const mockContactsService = new MockContactsService();
const mockNotificationService = new MockNotificationsService();

describe('ContactListComponent', () => {
  let component: ContactListComponent;
  let fixture: ComponentFixture<ContactListComponent>;
  let obs$;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ContactListComponent],
      imports: [SharedModule, BrowserAnimationsModule],
      providers: [
        {provide: ContactsService, useValue: mockContactsService},
        {provide: NotificationsService, useValue: mockNotificationService}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    obs$ = new Subject();
    spyOn(mockContactsService, 'getContacts').and.returnValue(obs$);

    fixture = TestBed.createComponent(ContactListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit contacts', () => {

    it('should call getContacts on first load and set contacts successfully in the table', () => {

      expect(component.contacts.data).toEqual([]);
      expect(component.isLoadingContacts).toBe(true);
      expect(mockContactsService.getContacts).toHaveBeenCalled();

      obs$.next(MOCK_CONTACTS_RESPONSE);
      fixture.detectChanges(); // in order to check changes -> contacts are in the table ?
      expect(component.contacts.data.length).toEqual(2);
      expect(component.contacts.data).toEqual([
        {
          firstName: "DIONIS-ALEXANDRU",
          lastName: "OROS",
          email: "dionis.oros@gmail.com",
          country: "Afghanistan",
          createdAt: "Mar 16, 2020, 8:17:42 PM",
          updatedAt: "Mar 16, 2020, 8:17:42 PM",
          createdBy: "usernametest",
          updatedBy: "usernametest",
          _id: "3F8bacZVPNrKSbnA"
        } as any,
        {
          firstName: "User1",
          lastName: "User1 ln",
          email: "user@gmail.com",
          country: "Antigua and Barbuda",
          createdAt: "Mar 16, 2020, 8:07:11 PM",
          updatedAt: "Mar 16, 2020, 8:07:11 PM",
          createdBy: "usernametest",
          updatedBy: "usernametest",
          _id: "kFukb3aAaEFsScnv"
        } as any,
      ]);

      let contactsTable = fixture.debugElement.nativeElement.querySelector('mat-table');
      expect(contactsTable.innerHTML).toContain('First Name');
      expect(contactsTable.innerHTML).toContain('Last Name');
      expect(contactsTable.innerHTML).toContain('Email');
      expect(contactsTable.innerHTML).toContain('Country');
      expect(contactsTable.innerHTML).toContain('Created');
      expect(contactsTable.innerHTML).toContain('Created by');
      expect(contactsTable.innerHTML).toContain('Last updated');
      expect(contactsTable.innerHTML).toContain('Updated by');
      expect(contactsTable.innerHTML).toContain('Edit/Delete');

      let matRows = fixture.nativeElement.querySelectorAll('mat-row');
      expect(matRows.length).toEqual(2);
      expect(matRows[0].innerHTML).toContain("DIONIS-ALEXANDRU");
      expect(matRows[0].innerHTML).toContain("OROS");
      expect(matRows[1].innerHTML).toContain("User1");
      expect(matRows[1].innerHTML).toContain("User1 ln");
    });

    it('should call getContacts on first load but NOT loading contacts because of error', () => {

      spyOn(mockNotificationService, 'error');

      expect(component.contacts.data).toEqual([]);
      expect(component.isLoadingContacts).toBe(true);
      expect(mockContactsService.getContacts).toHaveBeenCalled();

      obs$.error('ERROR!!!');
      fixture.detectChanges(); // to checking No contacts are in the table

      expect(component.contacts.data).toEqual([]);
      expect(component.isLoadingContacts).toEqual(false);
      expect(mockNotificationService.error).toHaveBeenCalledWith('Could not see contacts', {title: 'Server error'});

      let noContacts = fixture.debugElement.nativeElement.querySelector('mat-card');
      expect(noContacts.innerHTML).toContain('No contacts found.')
    })
  })

});
