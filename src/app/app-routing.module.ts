import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "/home"
  },
  {
    path: "home",
    pathMatch: "full",
    component: HomeComponent,
    data: {
      title: 'DoDo | Events'
    },
  },
  {
    path: "about",
    pathMatch: "full",
    component: AboutComponent,
    data: {
      title: 'DoDo | About Us'
    }    
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 