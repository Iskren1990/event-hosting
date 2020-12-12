import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { EventsService } from 'src/app/events/services/events.service';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {

  @Input() isLogged: Boolean = false;
  @Input() firstName: Boolean;
  public query: String;

  constructor(
    private eventsServices: EventsService,
    private userService: UserService,
    private router: Router,
  ) { }

  search() {
    const query = this.query !== "" ? `?eventCode=${this.query}` : "";
    const subscription = this.eventsServices.getEvents(query).subscribe();
    setTimeout(() => subscription?.unsubscribe(), 10000);
    this.query = "";
  }

  logout() {
    this.userService.logout().subscribe({
      next:() => this.router.navigateByUrl("/user/login")
    });
  }
}
