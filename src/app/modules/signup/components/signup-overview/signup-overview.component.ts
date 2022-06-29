import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup-overview',
  templateUrl: './signup-overview.component.html',
  styleUrls: ['./signup-overview.component.scss']
})
export class SignupOverviewComponent implements OnInit {

  signupOptions = [
    {
      id: 1,
      title: 'Student Account',
      description: 'For students, class participants, club members, etc',
      link: 'student',
      icon: '../../../assets/img/svg/student-signup.svg'
    },
    {
      id: 2,
      title: 'Parent Account',
      description: 'For parents or guardians',
      link: 'parent',
      icon: '../../../assets/img/svg/parent-signup.svg'
    },
    {
      id: 3,
      title: 'School Account',
      description: 'For admins of schools or any school representative',
      link: 'school',
      icon: '../../../assets/img/svg/school-signup.svg'
    },
    {
      id: 4,
      title: 'Educator Account',
      description: 'For teachers and instructors',
      link: 'educator',
      icon: '../../../assets/img/svg/teacher-signup.svg'
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

  // Go Back to the previous page
  goBack() {
    window.history.go(-1);
    return false;
  }

}
