import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/user/user.service';
import { EventsService } from '../services/events.service';
import { MEvent } from "../models/event";
import { tap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  private nameRegex: String = "[A-Za-z0-9 ]{1,15}";
  private ifEventId: String;
  public form: FormGroup;
  public firstName: String;
  public editData;
  public isEditMode: Boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private eventsService: EventsService,
    private userService: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.ifEventId = this.route.snapshot.params?.id;
    if (this.ifEventId !== undefined) {
      this.isEditMode = true;
      this.eventsService.getEvents(`?chosen=${this.ifEventId}`)
      .subscribe((data)=> this.editData = data[0])
    };


    this.form = this.fb.group({
      eventName: ["", [Validators.required, Validators.pattern(`${this.nameRegex}`)]],
      eventCode: ["", [Validators.required, Validators.pattern(`${this.nameRegex}`)]],
      startDate: ["", [Validators.required]],
      endDate: ["", [Validators.required]],
      eventDescription: ["", [Validators.required, Validators.minLength(10)]],
      eventImage: [""],
      access: ["Public"],
      id: [this.userService.userData?.id]
    });
    this.firstName = this.userService.userData?.firstName;
  }

  createEvent() {
    const event = new MEvent(this.form.value);

    this.eventsService.create(event).subscribe(() => {
      this.router.navigateByUrl("/events");
    });
  }

  editEvent() {
    this.eventsService.edit(`?chosen=${this.ifEventId}`, this.form.value).subscribe({
      next:() => this.router.navigateByUrl("/events")
    })
  }

  get path(): ValidationErrors {
    return this.form?.controls;
  }

  quickEvent() {
    const id = this.userService.userData?.id;
    this.eventsService.quickEvent(id).subscribe((data) => {
      this.router.navigateByUrl(`/events/event/${data["_id"]}`);
    });
  }
}