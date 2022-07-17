import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {

  courses = [
    {
      id: 1,
      name: 'Block Coding',
      basic: true,
      pro: true,
      school: true,
    },
    {
      id: 2,
      name: 'Steam Projects',
      basic: true,
      pro: true,
      school: true,
    },
    {
      id: 3,
      name: 'Design Thinking',
      basic: true,
      pro: true,
      school: true,
    },
    {
      id: 4,
      name: 'Entrepreneurship',
      basic: true,
      pro: true,
      school: true,
    },
    {
      id: 5,
      name: 'Roboics I',
      basic: true,
      pro: true,
      school: true,
    },
    {
      id: 6,
      name: 'Roboics II',
      basic: false,
      pro: true,
      school: true,
    },
    {
      id: 7,
      name: 'Roboics III',
      basic: false,
      pro: true,
      school: true,
    },
    {
      id: 8,
      name: 'Web Development',
      basic: false,
      pro: true,
      school: true,
    },
    {
      id: 9,
      name: 'Mobile Development',
      basic: false,
      pro: true,
      school: true,
    },
    {
      id: 10,
      name: 'Minecraft Modding',
      basic: false,
      pro: true,
      school: true,
    },
    {
      id: 11,
      name: 'Programming with C for Arduino',
      basic: false,
      pro: true,
      school: true,
    },

  ]

  analytics = [
    {
      id: 1,
      name: 'Progress Tracking',
      basic: true,
      pro: true,
      school: true,
    },
    {
      id: 2,
      name: 'Graded assignments',
      basic: false,
      pro: true,
      school: true,
    },

  ]

  feedback = [
    {
      id: 1,
      name: 'Mentorship',
      basic: false,
      pro: true,
      school: true,
    },
    {
      id: 2,
      name: 'Live Tutoring Classes',
      basic: false,
      pro: true,
      school: true,
    },

  ];

  monthlyPrice: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
