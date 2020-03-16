import {Injectable} from '@angular/core';
import {ApiService} from "../api.service";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {User, UserResponseInterface} from "../../../models/user/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  constructor(private apiService: ApiService) {
  }

  getUsers(): Observable<User[]> {
    return this.apiService.get<User[]>('/users').pipe(
      map((users: any) => {
        return users.map(user => new User(user))
      })
    );
  }

  getUserDetails(userId): Observable<User> {
    return this.apiService.get(`/users/${userId}`,).pipe(
      map((user: UserResponseInterface) => {
        return new User(user)
      })
    );
  }

  postUser(user: User): Observable<User> {
    return this.apiService.post<User>('/users', user);
  }

  updateUser(user: User): Observable<User> {
    return this.apiService.put<User>(`/users/${user._id}`, user);
  }


  deleteUser(userId: string) {
    return this.apiService.delete(`/users/${userId}`);
  }

}
