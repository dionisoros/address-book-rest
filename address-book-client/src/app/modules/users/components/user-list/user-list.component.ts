import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {delay, switchMap, takeUntil, tap} from "rxjs/operators";
import {User} from "../../../../shared/models/user/user.model";
import {trigger, style, animate, transition, state} from '@angular/animations';
import {UserDialogComponent} from "../user-dialog/user-dialog.component";
import {BehaviorSubject, empty, Subject} from "rxjs";
import {UserManagementService} from "../../../../shared/services/api/user-service/user-management.service";
import {NotificationsService} from "../../../../shared/services/common/notifications.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {sortingHeaderByLowerCase} from "../../../../shared/utils/helper-functions/sorting-header-by-lower-case";

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
  isLoadingUsers: boolean;
  users: MatTableDataSource<User> = new MatTableDataSource();
  displayedColumns: string[] = ['username', 'firstName', 'lastName', 'email', 'age', 'createdAt'];
  usersSelected = false;
  private _usersUpdatedSubject: BehaviorSubject<null> = new BehaviorSubject<null>(null);
  private _unsubscribe: Subject<void> = new Subject<void>();
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(
    private userService: UserManagementService,
    private notificatonsService: NotificationsService,
    private matDialog: MatDialog
  ) { }

  ngOnInit() {
    this._usersUpdatedSubject.pipe(
      tap(_ => this.isLoadingUsers = true),
      switchMap(() => {
        return this.userService.getUsers().pipe(delay(500))
      }),
      tap((users: User[]) => {
        this.users = new MatTableDataSource<User>(users);
        this.users.sort = this.sort;
        this.users.paginator = this.paginator;
        this.users.sortingDataAccessor = (data: any, sortHeaderId: string) => sortingHeaderByLowerCase(data, sortHeaderId);
        this.isLoadingUsers = false
      }, () => {
        this.notificatonsService.error('Could not get users', {title: 'Server error'});
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
          result.createdAt = new Date();
          return this.userService.postUser(result)
        }
      }),
      tap((user: User) => {
        this.notificatonsService.success(` ${user.username} added.`);
        this.isLoadingUsers = true;
        this._usersUpdatedSubject.next(null);
      })
    ).subscribe()
  }

  filterTable (filterValue :string) {
    this.users.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy() {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }
}
