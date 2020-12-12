import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/user/user.service';
import { MEvent } from "../models/event";
import { EventsService } from '../services/events.service';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css']
})

export class EventCardComponent implements OnInit {

  @Input() event: MEvent;
  public isOwner: Boolean = false;
  public notDeleted: Boolean = true;
  private subscription: Subscription;

  constructor(
    private userService: UserService,
    private eventsService: EventsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isOwner = false;
    this.isOwner = String(this.userService.userData?.id) === String(this.event.owner);
  }

  delete() {
    this.subscription = this.eventsService.delete(this.event.id).subscribe({
      next: () => this.notDeleted = false,
    });
  }

  edit() {
    this.router.navigateByUrl(`/events/edit/${this.event.id}`);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
