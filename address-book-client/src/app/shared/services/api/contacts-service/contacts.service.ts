import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {ApiService} from "../api.service";
import {map} from "rxjs/operators";
import {ContactList, ContactResponse} from "../../../models/contact/contact.interface";
import {Contact} from "../../../models/contact/contact";
import {getNames} from 'country-list';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private readonly countryNames: string[];

  constructor(private apiService: ApiService) {
    this.countryNames = getNames();
  }

  getContacts(): Observable<Contact[]> {
    return this.apiService.get('/contacts').pipe(
      map((contacts: ContactList) => contacts.map(contact => new Contact(contact)))
    )
  }

  postContact(contact: Contact): Observable<Contact> {
    return this.apiService.post('/contacts', contact);
  }

  getContactById(contactId: string) {
    return this.apiService.get(`/contacts/${contactId}`).pipe(
      map((contact: ContactResponse) => new Contact(contact))
    );
  }

  getCountries(): string[] {
    return this.countryNames;
  }

  updateContact(contact: Contact): Observable<Contact> {
    return this.apiService.put<Contact>(`/contacts/${contact._id}`, contact);
  }

  deleteContact(contactId: string | number) {
    return this.apiService.delete(`/contacts/${contactId}`);
  }
}
