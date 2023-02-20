import { Component, OnInit } from '@angular/core';

import { EventService } from '../services/event.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public futureEvents: any = [];
  public pastEvents: any = [];

  constructor(private _eventService: EventService) {}

  ngOnInit(): void {
    this._eventService.accessAllPublicEvents().subscribe({
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
}
