import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css'],
})
export class EditEventComponent implements OnInit {
  public eventModificationForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    eventDate: new FormControl(''),
    eventTime: new FormControl(''),
    eventType: new FormControl(''),
    emailInvites: new FormControl(''),
  });
  public isRequestComplete: boolean = false;
  public successMessage: string = '';
  public isError: boolean = false;
  public userName: string = '';

  private _userEmail: any;

  constructor(
    private _authService: AuthService,
    private _eventService: EventService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._eventService
      .accessEventById(this._activatedRoute.snapshot.params['eventId'])
      .subscribe({
        next: (response: any) => {
          this.eventModificationForm = new FormGroup({
            title: new FormControl(response.title),
            description: new FormControl(response.description),
            eventDate: new FormControl(response.eventDate),
            eventTime: new FormControl(response.eventTime),
            eventType: new FormControl(response.eventType),
            emailInvites: new FormControl(response.emailInvites),
          });
        },
      });

    this._userEmail = this._authService.getUserEmailFromToken();
    this.userName = this._authService.getUserNameFromEmail(this._userEmail);
  }

  onSubmit(): void {
    this._eventService
      .modifyEvent(
        this._activatedRoute.snapshot.params['eventId'],
        this.eventModificationForm.value
      )
      .subscribe({
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
          setTimeout(() => {
            this._router.navigate(['/user/dashboard']);
          }, 3000);
        },
      });
  }

  onCancel(): void {
    this._router.navigate(['/user/dashboard']);
  }

  logout(): void {
    this._authService.logoutUser();
  }
}
