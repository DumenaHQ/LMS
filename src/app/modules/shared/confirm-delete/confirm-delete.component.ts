import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.scss']
})
export class ConfirmDeleteComponent implements OnInit {
  @Output() deleteModal: EventEmitter<any> = new EventEmitter();
  isAlert: boolean = false;
  alertMessage: string;
  alertColor: string;
  @Input() itemName: any;
  @Input() deleteUrl: any;
  @Input() deleteRoutePath: any;
  loading: boolean = false

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  // Remove item
  removeItem() {
    this.loading = true

    this.authService
      .deleteItem(this.deleteUrl)
      .subscribe((res: any) => {
        console.log(res);
        if (res.status === true) {
          this.showAlertPopup(res.message, 'success');
          setTimeout(() => {
            this.closeDeleteModal();
            if(this.deleteRoutePath !== '') {
              this.router.navigate([this.deleteRoutePath]);
            } else {
              window.location.reload();
            }
          }, 3000);
        }
      });
  }

  // Close modal
  closeDeleteModal() {
    this.deleteModal.emit()
  } 

  // Show alert
  showAlertPopup(message: string, color: string) {
    // Set message
    this.alertMessage = message;
    // Set color
    this.alertColor = color;
    // Show Alert
    this.isAlert = true;
    // Hide Alert
    setTimeout(() => {
      this.isAlert = false;
    }, 3000);
  }

}
