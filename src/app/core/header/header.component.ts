import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventsService } from 'src/app/events/services/events.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {

  @Input() isLogged;
  @Input() firstName;
  public data;
  public isDisabled;

  constructor(
    private eventsServices: EventsService,
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.data = this.userService.userData;
  }

  search(string: String) {
    const query = string !== "" ? `?eventCode=${string}` : "";
    this.eventsServices.getEvents(query);
  }

  logout() {
    this.userService.logout().subscribe({
      next:() => this.router.navigateByUrl("/user/login")
    });
  }
}
