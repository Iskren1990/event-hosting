import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { ProfileComponent } from '../profile/profile.component';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { AccessGuard } from 'src/app/core/guards/access.guard';

const userRoutes: Routes = [
  {
    path: 'user',
    canActivateChild: [AccessGuard],
    children: [
      {
        path: "register",
        component: RegisterComponent,
        data: {
          title: "DoDo | Register Account",
          accessControl: false,
        }
      },
      {
        path: "login",
        component: LoginComponent,
        data: {
          title: "DoDo | Login",
          accessControl: false,
        }
      },
      {
        path: "profile",
        children: [
          {
            path: "",
            pathMatch: "full",
            component: ProfileComponent,
            data: {
              title: "DoDo | Profile",
              accessControl: true,
            }
          },
          {
            path: "edit",
            component: EditProfileComponent,
            data: {
              title: "DoDo | Profile",
              accessControl: true,
            }
          }
        ]
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
