import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { EventsService } from '../services/events.service';
import { MEvent } from '../models/event';
import { UserService } from 'src/app/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-events',
  templateUrl: './my-events.component.html',
  styleUrls: ['./my-events.component.css']
})

export class MyEventsComponent implements OnInit {

  public firstName: String;
  public events$: Observable<MEvent | MEvent[]>;
  private subscription: Subscription;

  constructor(
    private eventsServices: EventsService, 
    private userService: UserService, 
    private router: Router, 

    ) { }

  ngOnInit(): void {
    const query = "?owner=me";
    this.events$ = this.eventsServices.getEvents(query);
    this.firstName = this.userService.userData?.firstName;
  }

  quickEvent() {
    const id = this.userService.userData?.id;
    this.subscription = this.eventsServices.quickEvent(id).subscribe((data) => {
      this.router.navigateByUrl(`/events/event/${data["_id"]}`)
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
