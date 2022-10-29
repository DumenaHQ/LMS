import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-robotics-champ',
  templateUrl: './robotics-champ.component.html',
  styleUrls: ['./robotics-champ.component.scss'],
})
export class RoboticsChampComponent implements OnInit {
  prizesList = [
    {
      id: 1,
      icon: 'assets/img/robotics-champ/Gold.svg',
      amount: 'N500,000',
      benefitsForStudents: [
        {
          name: 'N300,000',
        },
        {
          name: '6 Months access to our LMS',
        },
        {
          name: 'Company mercandise',
        },
        {
          name: 'Certificates',
        },
      ],
      benefitsForSchool: [
        {
          name: 'N200,000',
        },
        {
          name: 'Certificates',
        },
      ],
      bgColor: 'linear-gradient(180deg, #FFFFFF 0%, #FFEFE2 100%)',
    },
    {
      id: 2,
      icon: 'assets/img/robotics-champ/Silver.svg',
      amount: 'N350,000',
      benefitsForStudents: [
        {
          name: 'N200,000',
        },
        {
          name: '6 Months access to our LMS',
        },
        {
          name: 'Company mercandise',
        },
        {
          name: 'Certificates',
        },
      ],
      benefitsForSchool: [
        {
          name: 'N200,000',
        },
        {
          name: 'Certificates',
        },
      ],
      bgColor: 'linear-gradient(180deg, #FFFFFF 0%, #FFE2E2 100%)',
    },
    {
      id: 3,
      icon: 'assets/img/robotics-champ/Bronze.svg',
      amount: 'N250,000',
      benefitsForStudents: [
        {
          name: 'N150,000',
        },
        {
          name: '6 Months access to our LMS',
        },
        {
          name: 'Company mercandise',
        },
        {
          name: 'Certificates',
        },
      ],
      benefitsForSchool: [
        {
          name: 'N100,000',
        },
        {
          name: 'Certificates',
        },
      ],
      bgColor: 'linear-gradient(180deg, #FFFFFF 0%, #FBE2FF 100%)',
    },
  ];

  stages = [
    {
      id: 1,
      title: 'Circuit Design and Troubleshooting',
      date: 'October 2022 - November 2022',
    },
    {
      id: 2,
      title: 'Components and Coding',
      date: 'December 2022 - February 2023',
    },
    {
      id: 3,
      title: 'Knockoffs',
      date: 'March 2023',
    },
    {
      id: 4,
      title: 'Grand Finale',
      date: 'April 2023',
    },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  // Route user to signup and pass event value
  signUp() {
    let payload = {
      event: 'championship',
    };

    localStorage.setItem('event', JSON.stringify(payload));

    this.router.navigate(['/signup']);
  }
}
