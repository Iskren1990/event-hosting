import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpRequest, HttpResponse, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {



    constructor(private toster: ToastrService) { }
    // const errObj = {

    // }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
        return next.handle(req)
            .pipe(catchError((error: any) => {
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