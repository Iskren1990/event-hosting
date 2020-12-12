import { OnDestroy } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';
import { IUser } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit, OnDestroy {

  public positions: String[] = [
    "Trainer", "Lecturer",
    "Executive", "Event Manager",
    "Team Lead", "Marketing Manager",
    "Other"
  ];
  public userData: IUser;
  public form: FormGroup;
  private nameRegex: String = "^[A-Z][a-z-]*";
  private subscription: Subscription;

  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder,
    private storage: StorageService
  ) { }

  ngOnInit(): void {
    this.userData = this.userService.userData;
    this.form = this.fb.group({
      firstName: [this.userData.firstName, [Validators.required, Validators.pattern(`${this.nameRegex}`)]],
      lastName: [this.userData.lastName, [Validators.required, Validators.pattern(`${this.nameRegex}`)]],
      email: [this.userData.email, [Validators.required, Validators.email]],
      profilePic: [this.userData.profilePic],
      position: [this.userData.position]
    });
  }

  editUser() {
    this.subscription = this.userService.updateProfile(this.form.value).subscribe(
      data => { 
        this.storage.setItem('userData', data);
        this.router.navigateByUrl("/user/profile");
       });
  }

  get path(): ValidationErrors {
    return this.form?.controls;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
