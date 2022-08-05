import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-school-display-students',
  templateUrl: './school-display-students.component.html',
  styleUrls: ['./school-display-students.component.scss'],
})
export class SchoolDisplayStudentsComponent implements OnInit {
  allStudents = [
    {
      id: 1,
      image: '../../../../../../assets/img/children-avatar/child-avatar-1.png',
      name: 'Lovinda Jamestown',
      email: 'name@gmail.com',
      phoneNumber: '0901234567',
      gender: 'Male',
      dateEnrolled: 'July 2nd, 2022',
    },
    {
      id: 2,
      image: '../../../../../../assets/img/children-avatar/child-avatar-2.png',
      name: 'David Khing',
      email: 'name@gmail.com',
      phoneNumber: '0901234567',
      gender: 'Female',
      dateEnrolled: 'July 2nd, 2022',
    },
    {
      id: 3,
      image: '../../../../../../assets/img/children-avatar/child-avatar-3.png',
      name: 'Chris Evans',
      email: 'name@gmail.com',
      phoneNumber: '0901234567',
      gender: 'Male',
      dateEnrolled: 'July 2nd, 2022',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
