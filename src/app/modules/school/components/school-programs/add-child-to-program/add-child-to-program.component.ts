import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-child-to-program',
  templateUrl: './add-child-to-program.component.html',
  styleUrls: ['./add-child-to-program.component.scss'],
})
export class AddChildToProgramComponent implements OnInit {
  @Output() addChildToProgramModal: EventEmitter<any> = new EventEmitter();
  @Output() isAlert: EventEmitter<any> = new EventEmitter();
  @Output() alertMessaage = new EventEmitter<string>();

  hide: boolean = true;
  loading: boolean = false;
  returnUrl = '';
  isSignedin: boolean = false;
  errorMessage: string = '';
  showError: boolean = false;
  user: any;
  selectedAVatarUrl: string = '';
  selectedFile: File;
  previewImage: any;
  showPreviewImage: boolean = false;

  avatars = [
    {
      id: 1,
      image: '../../../../../../assets/img/children-avatar/child-avatar-1.png',
      name: 'avatar-1',
      selected: true,
    },
    {
      id: 2,
      image: 'assets/img/children-avatar/child-avatar-2.png',
      name: 'avatar-2',
      selected: false,
    },
    {
      id: 3,
      image: 'assets/img/children-avatar/child-avatar-3.png',
      name: 'avatar-3',
      selected: false,
    },
    {
      id: 4,
      image: 'assets/img/children-avatar/child-avatar-4.png',
      name: 'avatar-4',
      selected: false,
    },
    {
      id: 5,
      image: 'assets/img/children-avatar/child-avatar-5.png',
      name: 'avatar-5',
      selected: false,
    },
    {
      id: 6,
      image: 'assets/img/children-avatar/child-avatar-6.png',
      name: 'avatar-6',
      selected: false,
    },
  ];
  messageval: string;
  billingId: string = 'single';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Get User data from localstorage
    let userData = this.authService.getUser();
    this.user = userData.user;
  }

  // Tab change
  tabChange(ids: any) {
    this.billingId = ids;
  }

  // Select Avatar
  selectAvatar(selected: any) {
    this.avatars.forEach((e: any) => {
      // Set all avatar selected to false
      e.selected = false;
      // Check if the selected id same and is not true
      if (e.id === selected) {
        if (selected !== true) {
          // Set the only selected to true
          e.selected = true;

          // Set avatar url
          this.selectedAVatarUrl = e.image;
        }
      }
    });
  }

  // Sign Up
  signUp(data: any) {
    // Set loading to true
    this.loading = true;

    let payload = {
      avatar: this.selectedAVatarUrl,
      firstname: data.firstname,
      lastname: data.lastname,
      // parent: this.user.id,
      // user_type: 'learner',
      password: data.password,
    };

    // Send users data
    // this.authService.enrollChild(payload).subscribe(
    //   (res: any) => {
    //     console.log(res);

    //     if (res.status == true) {
    //       // Close Modal
    //       this.closeAddChildToProgramModal();

    //       // Show Popup
    //       this.showAlert();

    //       // Reload the page
    //       window.location.reload();
    //     }

    //     // Show error message
    //     this.errorMessage = res.message;
    //     this.showError = true;

    //     // Set loading to false
    //     this.loading = false;
    //   },
    //   (error: any) => {
    //     console.log(error);
    //     // Show error message
    //     error.error.error.code == 400
    //       ? (this.errorMessage = error.error.error.errors[0].message)
    //       : (this.errorMessage = error.error.message);
    //     this.showError = true;
    //     // Set loading to false
    //     this.loading = false;

    //     // Set Timeout
    //     // setTimeout(() => {
    //     //   this.showError = false
    //     // }, 3000);
    //   }
    // );
  }

  // Show alert popup
  showAlert() {
    this.messageval = 'You have enrolled a child successfully!';
    // Set alert message
    this.alertMessaage.emit(this.messageval);

    this.isAlert.emit();
  }

  // Upload File
  uploadFile(event: any) {
    // Preview File Selected
    this.selectedFile = event[0];

    if (this.selectedFile) {
      let reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      reader.onload = (e: any) => {
        this.previewImage = e.target.result;
        if (this.previewImage !== '') {
          this.showPreviewImage = true;
        } else {
          this.showPreviewImage = false;
        }
      };
    }
  }

  // Close Add Modal
  closeAddChildToProgramModal() {
    this.addChildToProgramModal.emit();
  }
}
