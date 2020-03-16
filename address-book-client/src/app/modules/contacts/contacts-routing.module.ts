import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {ContactListComponent} from "./components/contact-list/contact-list.component";
import {ContactAddComponent} from "./components/contact-add/contact-add.component";
import {ContactEditComponent} from "./components/contact-edit/contact-edit.component";

const routes: Routes = [
  {
    path: '',
    component: ContactListComponent
  },
  {
    path: 'add-new',
    component: ContactAddComponent
  },
  {
    path: ':id',
    component: ContactEditComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactsRoutingModule {

}
