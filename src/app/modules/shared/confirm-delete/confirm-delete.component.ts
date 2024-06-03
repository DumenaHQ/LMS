import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AlertType, AppAlertService } from 'src/app/services/app-alerts/app-alert.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.scss']
})
export class ConfirmDeleteComponent implements OnInit {
  @Output() confrimModal: EventEmitter<any> = new EventEmitter();
  @Output() reloadData: EventEmitter<any> = new EventEmitter();
  @Input() confirmMessage: any;
  @Input() confirmUrl: any;
  @Input() confirmMethod: any;
  loading: boolean = false;

  constructor(
    private authService: AuthService, 
    private router: Router,
    private appAlertService: AppAlertService,
  ) { }

  ngOnInit(): void {
  }

  confirmAction() {
    this.loading = true;
    this.authService
      .confirmItem(this.confirmUrl, this.confirmMethod).subscribe({
        next:(res: any) => {
          if (res.status === true) {
            this.appAlertService.showAlert(res.message, AlertType.Success);
            this.closeDeleteModal();
            this.getReloadedData();
          }
        },
        error:(error: any) => {
          console.log(error);
          this.appAlertService.showAlert(
            error.error.message
            ? (error.error.message)
            : (error.error.error.errors[0].message),
            AlertType.Error
          );
        },
        complete:() => {
          this.loading = false;
        }
    });
  }

  // Close modal
  closeDeleteModal() {
    this.confrimModal.emit();
  }

  getReloadedData() {
    this.reloadData.emit();
  } 

}
