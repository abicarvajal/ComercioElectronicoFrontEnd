import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error=>{
        if(error){
          if(error.status==400){
            console.log(`Error 400`, error);
            throw error.error;
          }
          if(error.status==401){
            console.log(`Error 401`, error);
            throw error.error;
          }
          if(error.status==404){
            console.log(`Error 404 Not Found`, error);
            this.router.navigateByUrl('/not-found');
          }
          if(error.status==500){
            console.log(`Error 500`, error);
            throw error.error;
          }
        }

        return throwError(error)
      })
    )
  }
}
