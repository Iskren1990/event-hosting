import { Injectable } from '@angular/core';
import {
    HttpEvent, HttpHandler, HttpRequest,
    HttpResponse, HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

    constructor(private toster: ToastrService, private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
        return next.handle(req)

            .pipe(catchError((error: HttpResponse<any>) => {
                if (error.status === 404) {
                    this.router.navigateByUrl("/page/not/found");
                    return of(error);
                }
                if (error instanceof HttpErrorResponse) {
                    try {
                        error["error"].message.forEach((message: string) => {
                            this.toster.error(message, "", { timeOut: 3000 });
                        });
                    } catch (e) {
                        this.toster.error('An error occurred');
                        console.error(e);
                    }
                }
                return of(error);
            }));
    }
}