import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivationEnd, NavigationEnd, Router } from '@angular/router';
import { buffer, debounceTime, filter, map, tap } from 'rxjs/operators';
import { UserService } from './user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit{

  public isLogged: Boolean = false;
  public firstName: String;
  
  constructor(private titleS: Title, private router: Router, private userService: UserService) {}

  ngOnInit(): void {
    this.setTitle();    
  }

  public setTitle() {

    this.router.events
    .pipe(
      tap(()=> {
        this.firstName = this.userService.userData?.firstName;
        this.isLogged = this.userService.isLogged;
      }),
      filter(e => e instanceof ActivationEnd),
      buffer(this.router.events.pipe(filter(e => e instanceof NavigationEnd), debounceTime(0))),
      map((events: ActivationEnd[]) => events.reduce((acc, curr) => ({ ...acc, ...curr.snapshot.data }), {}))
    ).subscribe(data =>this.titleS.setTitle(data["title"]));
  }
}
