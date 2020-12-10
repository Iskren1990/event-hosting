import { Component, OnInit } from '@angular/core';
import { IUser } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  public userData: IUser;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userData = this.userService.userData;
  }
}
