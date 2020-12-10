import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccessGuard } from 'src/app/core/guards/access.guard';
import { CreateComponent } from '../create/create.component';
import { EventComponent } from '../event/event.component';
import { MyEventsComponent } from '../my-events/my-events.component';

const eventsRoutes: Routes = [
  {
    path: "events",
    canActivateChild: [AccessGuard],
    children: [
      {
        path: "",
        pathMatch: "full",
        component: MyEventsComponent,
        data: {
          title: "DoDo | My Events",
          accessControl: true,
        }
      },
      {
        path: "create",
        component: CreateComponent,
        data: {
          title: "DoDo | Create Event",
          accessControl: true,
        }
      },
      {
        path: "event/:id",
        component: EventComponent,
        data: {
          title: "DoDo | Event",
          accessControl: false,
        }
      },
      {
        path: "edit/:id",
        component: CreateComponent,
        data: {
          title: "DoDo | Edit Event",
          accessControl: true,
        }
      },
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(eventsRoutes)],
  exports: [RouterModule]
})
export class EventRoutingModule { }