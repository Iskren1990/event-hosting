import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MEvent } from '../events/models/event';
import { EventsService } from '../events/services/events.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  @Input()
  hidePageSize: boolean = true;
  @Input()
  pageIndex: number;
  @Output()
  page: EventEmitter<PageEvent>;
  
  public length: number;
  public pageSize: number = 6;
  public end: number = 6;
  public events$: Observable<MEvent[]>;
  public start: number = 0;

  constructor(private eventsServices: EventsService) { }

  ngOnInit(): void {
    console.log("Fix pagination")
    const query = "?access=Public";
    this.eventsServices.getEvents(query);
    this.events$ = this.eventsServices.getEvents()
    .pipe(tap((x: any) => {this.length = x.length}));
  }

  events(e) {
    this.start = +e.pageIndex * this.pageSize;
    this.end = +this.start + this.pageSize;
  }
}
