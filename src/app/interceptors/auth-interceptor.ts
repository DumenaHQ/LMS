import { Inject, Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AlertType, AppAlertService } from '../services/app-alerts/app-alert.service';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private appAlertService: AppAlertService,
  ) {
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authToken = this.getAuthToken();

    // Clone the request and add the Authorization header
    if (authToken) {
      const authReq = req.clone({
        setHeaders: { Authorization: `Bearer ${authToken}` },
      });

      return next.handle(authReq).pipe(catchError((err) => {
        return this.handleError(err);
      }));
    }

    // Handle cases where there's no token
    return next.handle(req);
  }

  // Replace this with your method to retrieve the authentication token
  private getAuthToken(): string | null {
    // Implement logic to get token from storage or service
    // This example gets it from localStorage for simplicity
    return localStorage.getItem('token');
  }

  private handleError(error: any): Observable<any> {
    if (error.status === 401) {        
        // Handle 401 errors (unauthorized access)
        this.appAlertService.showAlert(
          'Your session has expired. Please login again.',
          AlertType.Error,
        );

        this.router.navigate(['/login']);
      return throwError(error);
    }
    return throwError(error);
  }
}
