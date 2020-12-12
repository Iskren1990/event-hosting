import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { MEvent } from '../models/event';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class EventsService {

  private _events: BehaviorSubject<MEvent[] | MEvent> = new BehaviorSubject(undefined);
  public events$ = this._events.asObservable();

  constructor(private http: HttpClient) { }

  public getEvents(query: String = "") {
    return this.http.get(`/events/public${query}`)
      .pipe(map((i: MEvent[]) => ((i.map((x: any) => new MEvent(x))))))
      .pipe(tap((events: MEvent[] | MEvent) => this._events.next(events)));
  }

  public create(eventData) {
    return this.http.post(`/events/create`, eventData);
  }

  public delete(id) {
    return this.http.delete(`/events/delete/${id}`);
  }

  public edit(query, data) {
    return this.http.put(`/events/edit${query}`, data);
  }

  public quickEvent(userId) {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDay().toString().padStart(2, "0");

    const quickEvent = {
      eventName: "Q" + Date.now().toString(),
      eventCode: "Q" + Date.now().toString(),
      startDate: `${year}-${month}-${day}`,
      endDate: `${year}-${month}-${day}`,
      eventDescription: "Quick event setup",
      eventImage: "",
      access: "Public",
      id: userId,
    }
    return this.create(quickEvent);
  }
}
