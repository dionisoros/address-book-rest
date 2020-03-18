import {ContactsService} from './contacts.service';
import {Observable, of} from "rxjs";
import {Contact} from "../../../models/contact/contact";

const MOCK_CONTACT = {
  firstName: "User2",
  astName: "User2 ln",
  email: "user2@gmail.com",
  country: "Saint Barthélemy",
  createdAt: "Mar 16, 2020, 8:07:41 PM",
  updatedAt: "Mar 16, 2020, 8:07:41 PM",
  createdBy: "usernametest",
  updatedBy: "usernametest",
  _id: "CONTACT_ID"
} as any;

class MockApiService {
  get() {}
  post() {}
  put() {}
  delete() {}
}

describe('ContactsService tests', () => {
  let contactsService: ContactsService;
  let mockApiService;

  beforeEach(() => {
    mockApiService = new MockApiService();
    contactsService = new ContactsService(mockApiService);
    // TestBed.configureTestingModule({});
    // service = TestBed.inject(ContactsService);
  });

  it('should be created', () => {
    expect(contactsService).toBeTruthy();
  });

  it('should call ApiService GET when getContacts is called AND map values to Contact model', () => {

    spyOn(mockApiService, 'get').and.returnValue(of([MOCK_CONTACT] as any));

    let getTodos: Observable<Contact[]> = contactsService.getContacts();

    expect(mockApiService.get).toHaveBeenCalledWith('/contacts');
    getTodos.subscribe((val) => {
      expect(val).toEqual([new Contact(MOCK_CONTACT)]);
      val.forEach((valTodo) => {
        expect(valTodo).toEqual(jasmine.any(Contact))
      })
    })
  });

  it('should call ApiService GET when getContactById is called AND map the value to Contact model', () => {

    spyOn(mockApiService, 'get').and.returnValue(of(MOCK_CONTACT));

    let getTodo: Observable<Contact> = contactsService.getContactById('CONTACT_ID');
    expect(mockApiService.get).toHaveBeenCalledWith('/contacts/CONTACT_ID');
    getTodo.subscribe((val) => {
      expect(val).toEqual(new Contact(MOCK_CONTACT));
    })
  });

  it('should call ApiService POST when postContact is called', () => {

    spyOn(mockApiService, 'post').and.callThrough();

    contactsService.postContact('CONTACT_POST_BODY' as any);

    expect(mockApiService.post).toHaveBeenCalledWith('/contacts', 'CONTACT_POST_BODY');
  });

  it('should call ApiService PUT when updateContact is called', () => {

    spyOn(mockApiService, 'put').and.callThrough();

    contactsService.updateContact(MOCK_CONTACT);

    expect(mockApiService.put).toHaveBeenCalledWith('/contacts/CONTACT_ID', MOCK_CONTACT);
  });

  it('should call ApiService DELETE when deleteContact is called', () => {

    spyOn(mockApiService, 'delete').and.callThrough();

    contactsService.deleteContact('CONTACT_ID');

    expect(mockApiService.delete).toHaveBeenCalledWith('/contacts/CONTACT_ID');
  })

});
