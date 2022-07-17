import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-learner-overview',
  templateUrl: './learner-overview.component.html',
  styleUrls: ['./learner-overview.component.scss']
})
export class LearnerOverviewComponent implements OnInit {


  elem: any;
  stepValue = 40;
  onboardModal: number = 1;
  isOnboarding: boolean = true;
  user: any;

  avatars = [
    {
      id: 1,
      image: '../../../../../../assets/img/children-avatar/child-avatar-1.png',
      selected: true
    },
    {
      id: 2,
      image: '../../../../../../assets/img/children-avatar/child-avatar-2.png',
      selected: false
    },
    {
      id: 3,
      image: '../../../../../../assets/img/children-avatar/child-avatar-3.png',
      selected: false
    },
    {
      id: 4,
      image: '../../../../../../assets/img/children-avatar/child-avatar-4.png',
      selected: false
    },
    {
      id: 5,
      image: '../../../../../../assets/img/children-avatar/child-avatar-5.png',
      selected: false
    },
    {
      id: 6,
      image: '../../../../../../assets/img/children-avatar/child-avatar-6.png',
      selected: false
    },
    {
      id: 7,
      image: '../../../../../../assets/img/children-avatar/child-avatar-7.png',
      selected: false
    },
    {
      id: 8,
      image: '../../../../../../assets/img/children-avatar/child-avatar-8.png',
      selected: false
    },
    {
      id: 9,
      image: '../../../../../../assets/img/children-avatar/child-avatar-9.png',
      selected: false
    },
    {
      id: 10,
      image: '../../../../../../assets/img/children-avatar/child-avatar-10.png',
      selected: false
    },
    {
      id: 11,
      image: '../../../../../../assets/img/children-avatar/child-avatar-11.png',
      selected: false
    },
    {
      id: 12,
      image: '../../../../../../assets/img/children-avatar/child-avatar-12.png',
      selected: false
    },
    {
      id: 13,
      image: '../../../../../../assets/img/children-avatar/child-avatar-12.png',
      selected: false
    },
  ]

  interests = [
    {
      id: 1,
      value: 'Building',
      selected: false
    },
    {
      id: 2,
      value: 'Coding',
      selected: false
    },
    {
      id: 3,
      value: 'Designing',
      selected: false
    },
    {
      id: 4,
      value: 'Art & Craft',
      selected: false
    },
    {
      id: 5,
      value: 'Product',
      selected: false
    },
    {
      id: 6,
      value: 'Robotics',
      selected: false
    },
    {
      id: 7,
      value: 'Coding',
      selected: false
    },
    {
      id: 8,
      value: 'Designing',
      selected: false
    },
  ]

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    // Get user data from localstorage
    let userData = this.authService.getUser()
    this.user = userData.user

    this.progressBar()
  }

  // Onboard Modal Change
  onboardModalChange(ids: any) {
    this.onboardModal = ids
  }

  // Progress Bar
  progressBar() {
    this.elem = document.getElementById("bar");

    this.elem.style.width = this.stepValue + '%';
    this.elem.innerHTML = this.stepValue + '%' + ' complete';
    this.stepValue = (this.stepValue + 10);
  }

  yes(data: any) {
    let payload = {
      avatar: data.image
    }
    // this.hi = data.image

    // console.log(this.hi)
    // this.hi.push(payload)
  }

  no(data: any, currentModal: any) {
    console.log(data.username)
    this.onboardModal = currentModal += 1

    console.log(currentModal += 1)
  }

}
