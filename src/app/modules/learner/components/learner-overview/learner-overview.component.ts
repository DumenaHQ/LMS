import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-learner-overview',
  templateUrl: './learner-overview.component.html',
  styleUrls: ['./learner-overview.component.scss'],
})
export class LearnerOverviewComponent implements OnInit {
  elem: any;
  stepValue = 40;
  user: any;
  isOnboarding: boolean = true;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Get user data from localstorage
    let userData = this.authService.getUser();
    this.user = userData.user;

    this.progressBar();
  }

  // close Onboarding modal
  closeOnboardModal() {

    // this.isOnboarding = false

    let payload = {
      isUserOnboarded: true,
    }
    console.log(payload);
    
    // update user profile
    this.authService.updateUser(payload).subscribe((res: any) => {
      console.log(res);
      if (res.status == true) {
        
        // Set User data
        this.authService.addUserDataToLocalStorage(res.data);
        this.ngOnInit()
      }
    });
  }

  // Progress Bar
  progressBar() {
    this.elem = document.getElementById('bar');

    this.elem.style.width = this.stepValue + '%';
    // this.elem.innerHTML = this.stepValue + '%' + ' complete';
    this.stepValue = this.stepValue + 10;
  }
}
