import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router, private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authToken = this.authService.getToken();

    // Clone the request and add the Authorization header
    if (authToken) {
      const authReq = req.clone({
        setHeaders: { Authorization: `Bearer ${authToken}` },
      });
      return next.handle(authReq).pipe(catchError((error) => {
        return this.handleError(error);
      }));
    }

    // Handle cases where there's no token
    return next.handle(req);
  }

  private handleError(error: any): Observable<any> {
    if (error.status === 401) {
      // Remove token and data from local storage
      localStorage.removeItem('data');
      localStorage.removeItem('token');
      
      // Redirect to login page
      this.router.navigate(['/login']);
      return throwError(error);
    }
    return throwError(error);
  }
}
