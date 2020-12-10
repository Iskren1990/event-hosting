import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpRequest, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const apiUrl = environment.apiUrl;

@Injectable()
export class HttpReqResUrlInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {
        if (req.url.includes(apiUrl) === false) {
            const setUrl = req.clone({ url: apiUrl + req.url });
            return next.handle(setUrl);
        }
        return next.handle(req);        
    }
}