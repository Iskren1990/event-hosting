import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NoopAnimationsModule} from '@angular/platform-browser/animations';

import { ToastNoAnimationModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CoreModule } from './core/core.module';
import { storageServiceProvider } from './services/storage.service';
import { AboutComponent } from './about/about.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserService } from './user/user.service';
import { EventsService } from './events/services/events.service';
import { CommentsService } from './events/services/comments.service';
import { UserModule } from './user/user.module';
import { EventsModule } from './events/events.module';
import { AccessGuard } from './core/guards/access.guard';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    CoreModule,
    UserModule,
    EventsModule,
    AppRoutingModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatPaginatorModule,
    ToastNoAnimationModule.forRoot({
      positionClass: "toast-top-center",
      preventDuplicates: true,
    }),
  ],
  providers: [storageServiceProvider, UserService, EventsService, CommentsService, AccessGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
