import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { IntroBannerComponent } from './intro-banner/intro-banner.component';
import { httpInterceptorProviders } from './interceptors/index';



@NgModule({
  declarations: [HeaderComponent, FooterComponent, IntroBannerComponent],
  imports: [ CommonModule, FormsModule, RouterModule ],
  exports: [HeaderComponent, FooterComponent, IntroBannerComponent],
  providers: [httpInterceptorProviders]
})
export class CoreModule { }
