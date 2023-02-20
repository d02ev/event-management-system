import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css'],
})
export class UserHomeComponent implements OnInit {
  public pastEvents: any = [];
  public futureEvents: any = [];
  public userName: any;
  private _userEmail: any;

  constructor(
    private _eventService: EventService,
    private _authService: AuthService
  ) {}

  ngOnInit(): void {
    this._eventService.accessUserCreatedEvents().subscribe({
      next: (response: any) => {
        response.forEach((event: any) => {
          if (new Date() < new Date(event.eventDate + ' ' + event.eventTime)) {
            this.futureEvents.push(event);
          } else if (
            new Date() > new Date(event.eventDate + ' ' + event.eventTime)
          ) {
            this.pastEvents.push(event);
          }
        });
      },
      error: (err: any) => {},
      complete: () => {},
    });

    this._userEmail = this._authService.getUserEmailFromToken();
    this.userName = this._userEmail.split('')[0];
    this.userName = this.userName.toUpperCase();

  }

  deleteEvent(eventId: any) {
    this._eventService.deleteEvent(eventId).subscribe({
      next: () => {
        this.ngOnInit();
      },
    });
  }

  public logout() {
    this._authService.logoutUser();
  }
}
