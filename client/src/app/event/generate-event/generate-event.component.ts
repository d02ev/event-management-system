import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-generate-event',
  templateUrl: './generate-event.component.html',
  styleUrls: ['./generate-event.component.css'],
})
export class GenerateEventComponent implements OnInit {
  public eventGenerationForm: any;
  public userName: any;
  public isRequestComplete: boolean = false;
  public successMessage: string = '';
  public isError: boolean = false;

  private _userEmail: any;

  constructor(
    private _eventService: EventService,
    private _authService: AuthService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.eventGenerationForm = new FormGroup({
      title: new FormControl(''),
      description: new FormControl(''),
      eventDate: new FormControl(''),
      eventTime: new FormControl(''),
      eventType: new FormControl('Public'),
      emailInvites: new FormControl(''),
    });
  }

  onSubmit(): void {
    this._eventService.createEvent(this.eventGenerationForm.value).subscribe({
      next: (response: any) => {
        this.isRequestComplete = true;
        this.successMessage = response.message;
      },
      error: (err: any) => {
        this.isError = true;

        setTimeout(() => {
          this.isError = false;
        }, 3000);
      },
      complete: () => {
        if (this._authService.isAdmin()) {
          setTimeout(() => {
            this._router.navigate(['/admin/dashboard']);
          }, 3000);
        }
        else {
          setTimeout(() => {
            this._router.navigate(['/user/dashboard']);
          }, 3000);
        }
      },
    });

    this._userEmail = this._authService.getUserEmailFromToken();
    this.userName = this._authService.getUserNameFromEmail(this._userEmail);
  }

  public logout() {
    this._authService.logoutUser();
  }

  onCancel() {
    this._router.navigate(['/user/dashboard']);
  }
}
