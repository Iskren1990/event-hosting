import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { SocketioService } from '../services/socketio.service';

import { EventsService } from '../services/events.service';
import { MEvent } from '../models/event';
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

  private eventId: String;

  public tempId: String;
  public isOwner: Boolean;
  public user: IUser;
  public chosenEv$: Observable<MEvent[] | MEvent>;
  public array: MComment[] = [];
  public uName: String;
  public comment: String;
  public form: FormGroup;
  public isArray: Boolean = false;
  
  constructor(
    private eventsService: EventsService,
    private routeSnapshot: ActivatedRoute,
    private userService: UserService,
    private fb: FormBuilder,
    private socket: SocketioService
  ) {
    this.eventId = this.routeSnapshot.snapshot.params.id;
    this.tempId = Date.now().toString();
    this.form = this.fb.group({
      uName: ["Anonymous"],
      comment: ["", [Validators.required]]
    });
  }

  ngOnInit(): void {
    // remove dumbass query !!

    const evQuery = `?chosen=${this.eventId}`;
    this.user = this.userService.userData;
    this.chosenEv$ = this.eventsService.getEvents(evQuery);
    this.socket.setupSocketConnection(this.eventId, this.array);
    this.socket.receiveAll(this.array);
    this.socket.newMessage(this.array);
    this.socket.newReply(this.array);
    this.socket.onDelete(this.array);
  }

  send() {
    const { uName, comment } = this.form.value;
    const userComment: MComment = new MComment({
      username: uName, comment: comment,
      eventId: this.eventId, tempId: this.tempId
    });
    this.socket.sendMessage(userComment);
    this.form.controls.comment.reset();
  }

  ngOnDestroy(): void {
    this.socket.closeConnection();
  }
}
