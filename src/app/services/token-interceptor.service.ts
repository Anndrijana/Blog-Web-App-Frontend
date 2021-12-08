import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private injector: Injector) { }   
  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    if (localStorage.getItem('token') != null) {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json', 
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
    } else {
      request = request.clone({});
    }
    return next.handle(request);
  }
}
