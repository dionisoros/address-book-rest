import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ContactsService} from "../../../../shared/services/api/contacts-service/contacts.service";
import {Router} from "@angular/router";
import {NotificationsService} from "../../../../shared/services/common/notifications.service";
import {Observable} from "rxjs";
import {map, startWith} from "rxjs/operators";
import {Contact} from "../../../../shared/models/contact/contact";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {DatePipe} from "@angular/common";
import {
  emailValidation, excludeNumbers,
  nameValidation,
  whiteSpaces
} from "../../../../shared/utils/validators/patterns-validation";

@Component({
  selector: 'app-contact-add',
  templateUrl: './contact-add.component.html',
  styleUrls: ['./contact-add.component.scss'],
  animations: [
    trigger('flyInOut', [
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        style({transform: 'translateX(-100%)'}),
        animate(800)
      ]),
      transition('* => void', [
        animate(100, style({transform: 'translateX(100%)'}))
      ])
    ])
  ]
})
export class ContactAddComponent implements OnInit {

  contactForm: FormGroup;
  private countryList: string[] = [];
  countryListFiltered: Observable<string[]>;

  constructor(
    private formBuilder: FormBuilder,
    private contactsService: ContactsService,
    private router: Router,
    private notificationsService: NotificationsService,
    private datePipe: DatePipe
  ) {
  }

  ngOnInit(): void {
    this.countryList = this.contactsService.getCountries();
    this.contactForm = this.formBuilder.group({
      firstName: [null, Validators.compose([
        Validators.required,
        Validators.maxLength(40),
        Validators.minLength(2),
        Validators.pattern(nameValidation)
      ])],
      lastName: [null, Validators.compose([
        Validators.required,
        Validators.maxLength(40),
        Validators.minLength(2),
        Validators.pattern(nameValidation),
      ])],  // not necessary new FormControl() because is already!
      email: [null, Validators.compose([
        Validators.required,
        Validators.pattern(emailValidation),
        Validators.maxLength(100),
        Validators.pattern(whiteSpaces)
      ])],
      country: [null, Validators.compose([
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100),
        Validators.pattern(whiteSpaces),
        Validators.pattern(excludeNumbers)
      ])],
    });

    this.countryListFiltered = this.contactForm.get('country').valueChanges
      .pipe(startWith(''), map(value => {
        return this.filterCountries(value)
      }));
  }

  contactSubmit(): void {
    const contactFormValue = this.contactForm.value;
    const contactAudit = {
      createdAt: this.datePipe.transform(new Date(), 'medium'),
      updatedAt: this.datePipe.transform(new Date(), 'medium'),
      createdBy: localStorage.getItem('userLoggedIn'),
      updatedBy: localStorage.getItem('userLoggedIn')
    };
    this.contactsService.postContact({...contactFormValue, ...contactAudit}).subscribe((contact: Contact) => {
      this.router.navigate(['/contacts']);
      this.notificationsService.success(`${contact.firstName + ' ' + contact.lastName} added.`)
    }, () => {
      this.notificationsService.error(`${contactFormValue.firstName} couldn't be added.`)
    })
  }

  private filterCountries(value: string): string[] {
    const filterValue = value.toLocaleLowerCase().trim();
    return this.countryList.filter(country => country.toLocaleLowerCase().includes(filterValue));
  }
}
