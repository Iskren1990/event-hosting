import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  public isLogged: Boolean = false;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.isLogged = this.userService.isLogged;
  }

}
