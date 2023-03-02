import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private _baseUrl: string = 'http://localhost:5000'

  constructor(private _httpClient: HttpClient) { }

  // create events
  public createEvent(creationData: any): Observable<any> {
    return this._httpClient.post(this._baseUrl + '/event', creationData);
  };

  // access all events
  public accessAllEvents(): Observable<any> {
    return this._httpClient.get(this._baseUrl + '/event');
  }

  // access event by id
  public accessEventById(eventId: any): Observable<any> {
    return this._httpClient.get(`${this._baseUrl}/event/${eventId}`);
  }

  // access all public events
  public accessAllPublicEvents(): Observable<any> {
    return this._httpClient.get(this._baseUrl + '/event/public/all');
  }

  // access user created events
  public accessUserCreatedEvents(): Observable<any> {
    return this._httpClient.get(this._baseUrl + '/event/dashboard/all');
  }

  // edit event
  public modifyEvent(eventId: any, modificationData: any): Observable<any> {
    return this._httpClient.patch(`${this._baseUrl}/event/edit/${eventId}`, modificationData);
  }

  // delete event
  public deleteEvent(eventId: any): Observable<any> {
    return this._httpClient.delete(`${this._baseUrl}/event/delete/${eventId}`);
  }
}
