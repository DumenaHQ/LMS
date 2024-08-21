import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

export type UserModel = {
  avatar?:      string;
  isUserOnboarded?:    boolean;
  interests?: Array<string>;
  username?: string;
}

@Component({
  selector: 'app-learner-onboard',
  templateUrl: './learner-onboard.component.html',
  styleUrls: ['./learner-onboard.component.scss'],
})
export class LearnerOnboardComponent implements OnInit {
  onboardModal: number = 1;
  @Output() isOnboarding: EventEmitter<any> = new EventEmitter();

  avatars = [
    {
      id: 1,
      image: 'assets/img/children-avatar/child-avatar-1.png',
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
    {
      id: 7,
      image: 'assets/img/children-avatar/child-avatar-7.png',
      name: 'avatar-7',
      selected: false,
    },
    {
      id: 8,
      image: 'assets/img/children-avatar/child-avatar-8.png',
      name: 'avatar-8',
      selected: false,
    },
    {
      id: 9,
      image: 'assets/img/children-avatar/child-avatar-9.png',
      name: 'avatar-9',
      selected: false,
    },
    {
      id: 10,
      image: 'assets/img/children-avatar/child-avatar-10.png',
      name: 'avatar-10',
      selected: false,
    },
    {
      id: 11,
      image: 'assets/img/children-avatar/child-avatar-11.png',
      name: 'avatar-11',
      selected: false,
    },
    {
      id: 12,
      image: 'assets/img/children-avatar/child-avatar-12.png',
      name: 'avatar-12',
      selected: false,
    },
    {
      id: 13,
      image: 'assets/img/children-avatar/child-avatar-13.png',
      name: 'avatar-13',
      selected: false,
    },
  ];

  interests = [
    {
      id: 1,
      value: 'Building',
      selected: false,
    },
    {
      id: 2,
      value: 'Coding',
      selected: false,
    },
    {
      id: 3,
      value: 'Designing',
      selected: false,
    },
    {
      id: 4,
      value: 'Art & Craft',
      selected: false,
    },
    {
      id: 5,
      value: 'Product',
      selected: false,
    },
    {
      id: 6,
      value: 'Robotics',
      selected: false,
    },
    {
      id: 7,
      value: 'Gaming',
      selected: false,
    },
    {
      id: 8,
      value: 'AI',
      selected: false,
    },
  ];

  selectedAvatarUrl: string = '';
  selectedInterest: any[] = [];
  loading: boolean = false;
  user: any;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.getUser().user;
  }

  // Close Modal
  closeModal() {
    this.isOnboarding.emit();
  }

  // Onboard Modal Change
  onboardModalChange(ids: any) {
    this.onboardModal = ids;
  }

  // Select Avatar
  selectAvatar(selected: any) {
    this.avatars.forEach((e: any) => {
      e.selected = false;
      if (e.id === selected) {
        if (selected !== true) {
          e.selected = true;
          this.selectedAvatarUrl = e.image;
        }
      }
    });
  }

  // Select Interest
  selectInterest(selected: any) {
    selected.selected = true;
    let exist = this.selectedInterest.includes(selected.value);
    if (!exist) {
      this.selectedInterest.push(selected.value);
    }
  }

  // Complete Profile
  completeProfileSetup(currentModal: any) {
    this.loading = true;
    let payload: UserModel = {
      isUserOnboarded: true
    };

    if (this.selectedAvatarUrl) {
      payload.avatar = this.selectedAvatarUrl;
    }
    if (this.selectedInterest.length > 0) {
      payload.interests = this.selectedInterest;
    }

    this.updateUser(payload);
    this.onboardModal = currentModal += 1;
  }

  // Update User
  updateUser(payload: any) {
     this.authService.updateUser(payload).subscribe((res: any) => {
      if (res.status == true) {
        this.authService.addUserDataToLocalStorage(res.data);
      }
    });
  }
}
