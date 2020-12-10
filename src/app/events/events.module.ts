import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CreateComponent } from './create/create.component';
import { EventComponent } from './event/event.component';
import { MyEventsComponent } from './my-events/my-events.component';
import { EventRoutingModule } from './event-routing/event-routing.module';
import { EventCardComponent } from './event-card/event-card.component';
import { EventsService } from './services/events.service';
import { CommentsService } from './services/comments.service';
import { CommentComponent } from './comment/comment.component';

@NgModule({
  declarations: [
    CreateComponent,
    EventComponent,
    MyEventsComponent,
    EventCardComponent,
    CommentComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EventRoutingModule,
    
  ],
  providers: [EventsService, CommentsService],
  exports: [EventCardComponent]
})
export class EventsModule { }
