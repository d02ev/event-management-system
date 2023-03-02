import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private _baseUrl: string = 'http://localhost:5000';

  constructor(private _httpClient: HttpClient) { }

  // grant admin privileges
  public grantAdminPrivileges(userId: any): Observable<any> {
    return this._httpClient.patch(`${this._baseUrl}/admin/grant/${userId}`, {});
  }

  // revoke admin privileges
  public revokeAdminPrivileges(userId: any): Observable<any> {
    return this._httpClient.patch(`${this._baseUrl}/admin/revoke/${userId}`, {});
  }

  // access all users
  public accessAllUsers(): Observable<any> {
    return this._httpClient.get(this._baseUrl + '/admin/dashboard');
  }
}
