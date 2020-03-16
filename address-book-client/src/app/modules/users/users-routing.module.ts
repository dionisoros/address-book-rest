import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {UserListComponent} from "./components/user-list/user-list.component";
import {UserDetailsComponent} from "./components/user-details/user-details.component";
import {AuthGuard} from "../../shared/guards/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: UserListComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: ':id', component: UserDetailsComponent
      }
    ],
    data: { title: 'User list' }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {

}
