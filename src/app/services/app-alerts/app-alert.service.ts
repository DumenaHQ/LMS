import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export enum AlertType {
  Success = 'success',
  Error = 'error',
  Info = 'info',
  Warning = 'warning',
}

export interface Alert {
  message: string;
  type: AlertType;
}

@Injectable({
  providedIn: 'root',
})
export class AppAlertService {
  constructor() {}

  private alertSubject = new Subject<Alert>();

  showAlert(message: string, type: AlertType) {
    this.alertSubject.next({
      message,
      type,
    });
  }

  getAlertObservable(): Observable<Alert> {
    return this.alertSubject.asObservable();
  }
}
