import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginForm: any;
  public isRequestComplete: boolean = false;
  public isError: boolean = false;
  public errorMessage: string = '';

  constructor(private _authService: AuthService) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  onSubmit() {
    this._authService.login(this.loginForm.value).subscribe({
      next: (response: any) => {
        this.isRequestComplete = true;
        localStorage.setItem('authToken', response.jwtToken);
      },
      error: (err: any) => {
        this.isError = true;

        if (err.error.status == 404) {
          this.errorMessage = 'User Does Not Exist';
        } else {
          this.errorMessage = 'Internal Server Error!';
        }

        setTimeout(() => {
          this.isError = false;
        }, 3000);
      },
      complete: () => {},
    });
  }
}
