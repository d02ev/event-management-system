import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public registrationForm: any;
  public isRequestComplete: boolean = false;
  public isError: boolean = false;
  public errorMessage: string = '';

  constructor(private _authService: AuthService, private _router: Router) {}

  ngOnInit(): void {
    this.registrationForm = new FormGroup({
      fullName: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  onSubmit() {
    this._authService.register(this.registrationForm.value).subscribe({
      next: (response: any) => {
        this.isRequestComplete = true;
      },
      error: (err: any) => {
        this.isError = true;

        if (err.error.status == 400) {
          this.errorMessage = 'User Already Exists!';
        } else {
          this.errorMessage = 'Internal Server Error!';
        }

        setTimeout(() => {
          this.isError = false;
        }, 3000);
      },
      complete: () => {
        setTimeout(() => {
          this._router.navigate(['/auth/login']);
        }, 3000);
      },
    });
  }
}
