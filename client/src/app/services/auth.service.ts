import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _baseUrl: string = 'http://localhost:5000/api/v1';

  constructor(private _httpClient: HttpClient) { }

  private _decodeRoleFromToken(jwtToken: string | null): string {
    let jwtData = jwtToken!.split('.')[1];
    let decodedJwtJsonData = window.atob(jwtData);
    let decodedJwtData = JSON.parse(decodedJwtJsonData);
    let role = decodedJwtData['role'];

    return role;
  };

  public getUserIdFromToken(): any {
    let jwtToken = this._getJwtToken();
    let jwtData = jwtToken!.split('.')[1];
    let decodedJwtJsonData = window.atob(jwtData);
    let decodedJwtData = JSON.parse(decodedJwtJsonData);
    let userId = decodedJwtData['id'];

    return userId;
  };

  public getUserEmailFromToken(): any {
    let jwtToken = this._getJwtToken();
    let jwtData = jwtToken!.split('.')[1];
    let decodedJwtJsonData = window.atob(jwtData);
    let decodedJwtData = JSON.parse(decodedJwtJsonData);
    let userEmail = decodedJwtData['email'];

    return userEmail;
  };

  private _getJwtToken() {
    return localStorage.getItem('authToken');
  }

  public isClientLoggedIn(): boolean {
    return !!this._getJwtToken();
  };

  public isAdmin(): boolean {
    if (this.isClientLoggedIn() && this._decodeRoleFromToken(this._getJwtToken()) === '1') {
      return true;
    }

    return false;
  };

  public isSuperAdmin(): boolean {
    if (this.isClientLoggedIn() && this._decodeRoleFromToken(this._getJwtToken()) === '-1') {
      return true;
    }
    
    return false;
  };

  // register a user
  public register(creationData: any): Observable<any> {
    return this._httpClient.post(this._baseUrl + '/auth/register', creationData);
  };

  // login a user
  public login(loginData: any): Observable<any> {
    return this._httpClient.post(this._baseUrl + '/auth/login', loginData);
  };

  // logout user
  public logoutUser(): void {
    localStorage.removeItem('authToken');
  };

}
