import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;
  private passwordRegex: String = "[A-Za-z0-9]{3,}";
  private subscription: Subscription;

  constructor(
    private userService: UserService,
    private router: Router,
    private fb: FormBuilder,
    private storageService: StorageService,
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.pattern(`${this.passwordRegex}`)]],
    });
  }

  public login(): void {
    const { email, password } = this.form.value;

    this.subscription = this.userService.login({ email, password }).subscribe({
      complete: () => this.router.navigateByUrl("/")
    });
  }

  get path(): ValidationErrors {
    return this.form?.controls;
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}
