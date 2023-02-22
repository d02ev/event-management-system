import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css'],
})
export class EventDetailsComponent implements OnInit{
  public eventDetails: any;
  public isError: boolean = false;
  public userName: string = '';

  private _userEmail: any;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _eventService: EventService,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this._eventService
      .accessEventById(this._activatedRoute.snapshot.params['eventId'])
      .subscribe({
        next: (response: any) => {
          this.eventDetails = response;
        },
        error: (err: any) => {
          this.isError = true;
        },
      });

      this._userEmail = this._authService.getUserEmailFromToken();
      this.userName = this._authService.getUserNameFromEmail(this._userEmail);
  }

  onClick(): void {
    this._router.navigate(['/user/dashboard']);
  }

  logout(): void {
    this._authService.logoutUser();
  }
}
