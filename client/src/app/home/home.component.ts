import { Component, OnInit } from '@angular/core';

import { EventService } from '../services/event.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public events: any;

  constructor(private _eventService: EventService) {}

  ngOnInit(): void {
      this._eventService.accessAllPublicEvents().subscribe({
        next: (response: any) => {
          console.log(response);
        },
        error: (err: any) => { },
        complete: () => { }
      });
  }

}
