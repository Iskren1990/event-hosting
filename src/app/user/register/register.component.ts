import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';
import { IUser } from '../models/user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public positions: String[] = [
    "Trainer", "Lecturer",
    "Executive", "Event Manager",
    "Team Lead", "Marketing Manager",
    "Other"
  ];
  private nameRegex: String = "^[A-Z][a-z-]*";
  private passwordRegex: String = "[A-Za-z0-9]{3,}";
  private subscription: Subscription;
  public form: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private storageService: StorageService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      firstName: ["", [Validators.required, Validators.pattern(`${this.nameRegex}`)]],
      lastName: ["", [Validators.required, Validators.pattern(`${this.nameRegex}`)]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.pattern(`${this.passwordRegex}`)]],
      profilePic: [""],
      position: [""]
    });
  }

  registerUser() {

    const userData: IUser = this.form.value;

    this.subscription = this.userService.register(userData).subscribe(data => {
      this.storageService.setItem("isLogged", true);
      this.storageService.setItem("userData", data);
      this.router.navigateByUrl("/");
    });
  }

  get path(): ValidationErrors {
    return this.form?.controls;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
