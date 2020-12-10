import { Injectable } from '@angular/core';

import { HttpEvent, HttpHandler, HttpRequest, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class HttpReqResCredentialsInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {

        const setCredentials = req.clone({
            withCredentials: true
        });
        return next.handle(setCredentials);
    }
}


