import { Component, OnInit } from '@angular/core';

import { AdminService } from '../services/admin.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-super-admin-home',
  templateUrl: './super-admin-home.component.html',
  styleUrls: ['./super-admin-home.component.css'],
})
export class SuperAdminHomeComponent implements OnInit {
  public registeredUsers: any;
  public userName: string = '';
  public isGranted: boolean = false;
  public isRevoked: boolean = false;
  public grantedMessage: string = '';
  public revokedMessage: string = '';
  private _userEmail: any;

  constructor(
    private _adminService: AdminService,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this._adminService.accessAllUsers().subscribe({
      next: (response: any) => {
        this.registeredUsers = response;
      },
    });

    this._userEmail = this._authService.getUserEmailFromToken();
    this.userName = this._authService.getUserNameFromEmail(this._userEmail);
  }

  logout(): void {
    this._authService.logoutUser();
  }

  grant(userId: any): void {
    this._adminService.grantAdminPrivileges(userId).subscribe({
      next: (response: any) => {
        this.isGranted = true;
        this.grantedMessage = response.message;

        setTimeout(() => {
          this.isGranted = false;
        }, 3000)
      }
    });
  }

  revoke(userId: any): void {
    this._adminService.revokeAdminPrivileges(userId).subscribe({
      next: (response: any) => {
        this.isRevoked = true;
        this.revokedMessage = response.message;

        setTimeout(() => {
          this.isRevoked = false;
        }, 3000);
      }
    })
  }
}
