import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { EventsService } from '../services/events.service';
import { MEvent } from '../models/event';
import { CommentsService } from '../services/comments.service';
import { MComment } from '../models/comments';
import { UserService } from 'src/app/user/user.service';
import { IUser } from 'src/app/user/models/user';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})

export class EventComponent implements OnInit {

  private query: any;
  private eventId: String;

  public tempId: String;
  public isOwner: Boolean;
  public user: IUser;
  public chosenEv$: Observable<MEvent[]>;
  public comments$: Observable<MComment[]>;
  public uName: String;
  public comment: String;
  public form: FormGroup;
  public isArray: Boolean = false;


  constructor(
    private eventsService: EventsService,
    private routeSnapshot: ActivatedRoute,
    private commentsService: CommentsService,
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.eventId = this.routeSnapshot.snapshot.params.id;
    this.query = `?chosenEv=${this.eventId}`;
    this.tempId = Date.now().toString();
    this.form = this.fb.group({
      uName: [""],
      comment: ["", [Validators.required]]
    });
  }

  ngOnInit(): void {
    const evQuery = `?chosen=${this.eventId}`;
    this.user = this.userService.userData;
    this.chosenEv$ = this.eventsService.getEvents(evQuery);
    this.comments$ = this.commentsService.getAll(this.query);
  }

  refresh = () => {
    this.comments$ = this.commentsService.getAll(this.query);
  }

  send() {
    const { uName, comment } = this.form.value;
    const userComment: MComment = new MComment({
      username: uName,
      comment: comment,
      eventId: this.eventId,
      tempId: this.tempId
    });
    this.commentsService.post(userComment);
    this.refresh();
    this.form.reset();
  }
}
