import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, ObservableInput, throwError} from "rxjs";
import {environment} from "../../../../environments/environment";
import {catchError, share} from "rxjs/operators";
import {NotificationsService} from "../common/notifications.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    protected http: HttpClient,
    private notificationsService: NotificationsService,
    private router: Router
  ) {
  }

  private baseUrl = environment.api.baseUrl;

  public get<T>(url: string, options?: object | null): Observable<T> {
    const pathUrl = this.buildPathUrl(url, options);
    return this.http.get<T>(pathUrl, options).pipe(
      catchError((err): ObservableInput<T> => this.handleError(err)),
      share()
    );
  }

  public post<T>(url: string, body: any | null, options?: object | null): Observable<T> {
    const pathUrl = this.buildPathUrl(url, options);
    return this.http.post<T>(pathUrl, body, options).pipe(
      catchError((err): ObservableInput<T> => this.handleError(err)),
      share()
    );
  }

  public put<T>(url: string, body: any | null, options?: object | null): Observable<T> {
    const pathUrl = this.buildPathUrl(url, options);
    return this.http.put<T>(pathUrl, body, options).pipe(
      catchError((err): ObservableInput<T> => this.handleError(err)),
      share()
    );
  }

  public patch<T>(url: string, body: any | null, options?: object | null): Observable<T> {
    const pathUrl = this.buildPathUrl(url, options);
    return this.http.patch<T>(pathUrl, body, options).pipe(
      catchError((err): ObservableInput<T> => this.handleError(err)),
      share()
    );
  }

  public delete<T>(url: string, options?: object | null): Observable<T> {
    const pathUrl = this.buildPathUrl(url, options);
    return this.http.delete<T>(pathUrl, options).pipe(
      catchError((err): ObservableInput<T> => this.handleError(err)),
      share()
    );
  }

  private buildPathUrl(url: string, options: object) {
    return this.baseUrl + url;
  }

  private handleError(httpErrorRes: HttpErrorResponse) {
    const serverErrMsg = (httpErrorRes && httpErrorRes.error)
      && httpErrorRes.error.issue
      && httpErrorRes.error.issue[0].error;

    if (httpErrorRes.status === 400) {
      // generic bad request, most likely failed backend validation
      this.notificationsService.error(serverErrMsg);
    } else if (httpErrorRes.status === 401) {
      this.router.navigate(['/sign-in']);
      this.notificationsService.error(serverErrMsg, {title: 'Unauthorized'});
    } else if (httpErrorRes.status === 404) {
      this.notificationsService.error(serverErrMsg, {title: 'Not found.'});
    } else {
      // 5xx - server errors
      this.notificationsService.error(serverErrMsg, {title: 'An error occurred.'});
    }
    console.error('Api error occurred:', httpErrorRes);

    return throwError(httpErrorRes);
  }
}
