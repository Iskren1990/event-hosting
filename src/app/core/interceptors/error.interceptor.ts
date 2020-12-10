import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpRequest, HttpResponse, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {



    constructor(private toster: ToastrService) {
        const errObj = {

        }
    }
    intercept(req: HttpRequest<any>, next: HttpHandler):
        Observable<HttpEvent<any>> {

        console.log("request : == :", req);

        return next.handle(req)
            // .pipe(catchError((event: HttpEvent<any>) => {
            //     console.log(event);
            //     event["error"].message.forEach(message => {
            //         this.toster.error(message, "Nope", { timeOut: 3000 });
            //     });
            //     return throwError(event)
            // }));
    } 
}

// tap(evt => {
//     if (evt instanceof HttpResponse) {
//         if (evt.body && evt.body.success)
//             this.toasterService.success(
//                 evt.body.success.message, evt.body.success.title, { positionClass: 'toast-bottom-center' });
//     }
// }),
//     catchError((err: any) => {
//         if (err instanceof HttpErrorResponse) {
//             try {
//                 this.toasterService.error(
//                     err.error.message, err.error.title, { positionClass: 'toast-bottom-center' });
//             } catch (e) {
//                 this.toasterService.error('An error occurred', '', { positionClass: 'toast-bottom-center' });
//             }
//             //log error 
//         }
//         return of(err);
//     });