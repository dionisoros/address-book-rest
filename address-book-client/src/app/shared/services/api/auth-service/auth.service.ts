import { Injectable } from '@angular/core';
import {ApiService} from "../api.service";

export interface TokenResponse {
  token: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  redirectUrl: string;

  constructor(private apiService: ApiService) { }

  signIn(credentials: {username, password}) {
    return this.apiService.post<TokenResponse>('/auth/login', credentials)
  }

  isAuthorized() {
    return localStorage.getItem('authToken') !== null
  }

  setLocalUserInfo(tokenResponse: TokenResponse) {
    localStorage.setItem('authToken', tokenResponse.token);
  }

  getAuthorizationToken(): string {
    return localStorage.getItem('authToken');
  }

  signUp(signUpObj: {[key: string]: string}) {
    return this.apiService.post<TokenResponse>('/auth/signup', signUpObj)
  }
}
