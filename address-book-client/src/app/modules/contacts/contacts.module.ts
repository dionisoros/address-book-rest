import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from "../../shared/shared.module";
import {ContactsRoutingModule} from "./contacts-routing.module";
import { ContactListComponent } from './components/contact-list/contact-list.component';
import {FormsModule} from "@angular/forms";
import { ContactAddComponent } from './components/contact-add/contact-add.component';
import {ContactEditComponent} from "./components/contact-edit/contact-edit.component";
import {CustomConfirmDialogComponent} from "../../shared/components/custom-confirm-dialog/custom-confirm-dialog.component";

@NgModule({
  declarations: [
    ContactListComponent,
    ContactAddComponent,
    ContactEditComponent,
    CustomConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    ContactsRoutingModule,
    SharedModule,
    FormsModule,
  ]
})
export class ContactsModule { }
