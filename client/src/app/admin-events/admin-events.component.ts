import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-admin-events',
  templateUrl: './admin-events.component.html',
  styleUrls: ['./admin-events.component.css'],
})
export class AdminEventsComponent {
  public futureEvents: any;
  public pastEvents: any;
  public userName: string = '';

  private _userEmail: any;

  constructor(
    private _eventService: EventService,
    private _authService: AuthService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
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
  }

  deleteEvent(eventId: any) {
    this._eventService.deleteEvent(eventId).subscribe({
      next: () => {
        window.location.reload();
      },
    });
  }

  logout(): void {
    this._authService.logoutUser();
  }
}
