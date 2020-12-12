import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { UserRoutingModule } from './user-routing/user-routing.module';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { UserService } from './user.service';
import { CoreModule } from '../core/core.module';

@NgModule({
  declarations: [ RegisterComponent, LoginComponent, ProfileComponent, EditProfileComponent],
  imports: [
    CommonModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    UserRoutingModule,
  ],
  providers: [UserService]
})
export class UserModule { }
