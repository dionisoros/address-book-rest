import {Component, OnDestroy, OnInit} from '@angular/core';
import {delay, switchMap, takeUntil, tap} from "rxjs/operators";
import {User} from "../../../../shared/models/user/user.model";
import {trigger, style, animate, transition, state} from '@angular/animations';
import {UserDialogComponent} from "../user-dialog/user-dialog.component";
import {BehaviorSubject, empty, Subject} from "rxjs";
import {UserManagementService} from "../../../../shared/services/api/user-service/user-management.service";
import {NotificationsService} from "../../../../shared/services/common/notifications.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
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
export class UserListComponent implements OnInit, OnDestroy {
  isLoadingUsers = true;
  users: User[] = [];
  displayedColumns = ['username', 'firstName', 'email'];
  usersSelected = false;
  private _usersUpdatedSubject: BehaviorSubject<null> = new BehaviorSubject<null>(null);
  private _unsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private userService: UserManagementService,
    private notificatonService: NotificationsService,
    private matDialog: MatDialog
  ) { }

  ngOnInit() {
    this._usersUpdatedSubject.pipe(
      switchMap(() => {
        return this.userService.getUsers().pipe(delay(500))
      }),
      tap((users: User[]) => {
        this.users = users;
        this.isLoadingUsers = false
      }, () => {
        this.notificatonService.error('Could not get users', {title: 'Server error'});
        this.isLoadingUsers = false
      }),
      takeUntil(this._unsubscribe)
    ).subscribe();
  }

  addNewUser() {
    const addUserDialogaddUserDialog = this.matDialog.open(UserDialogComponent, {});
    addUserDialogaddUserDialog.afterClosed().pipe(
      switchMap((result: User) => {
        if (result) {
          return this.userService.postUser(result)
        }
        return empty()
      }),
      tap((user) => {
        this._usersUpdatedSubject.next(null);
      })
    ).subscribe()
  }

  ngOnDestroy() {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }
}
