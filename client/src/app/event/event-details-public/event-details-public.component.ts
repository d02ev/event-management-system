import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { EventService } from 'src/app/services/event.service';

@Component({
  selector: 'app-event-details-public',
  templateUrl: './event-details-public.component.html',
  styleUrls: ['./event-details-public.component.css'],
})
export class EventDetailsPublicComponent implements OnInit {
  public eventDetails: any;
  public isError: boolean = false;

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _eventService: EventService
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
        }
      });
  }

  onClick(): void {
    this._router.navigate(['/']);
  }
}
