import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptor } from './error.interceptor';
import { HttpReqResCredentialsInterceptor } from './http-interceptor';
import { HttpReqResUrlInterceptor } from './http.url.interceptor';


export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpReqResUrlInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: HttpReqResCredentialsInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
];