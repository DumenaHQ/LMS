import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-library-courses-info',
  templateUrl: './library-courses-info.component.html',
  styleUrls: ['./library-courses-info.component.scss']
})
export class LibraryCoursesInfoComponent implements OnInit {

  courseContent = [
    {
      id: 1,
      name: 'Introduction to Robotics'
    },
    {
      id: 2,
      name: 'How to make your own Robots'
    },
    {
      id: 3,
      name: 'Robots are the future of tech'
    },
    {
      id: 4,
      name: 'What do you know about Robots Quiz'
    },
    {
      id: 5,
      name: 'Programming your Robot to do cool stuff'
    },
    {
      id: 6,
      name: 'Is your Robot malfunctioning?'
    },
    {
      id: 7,
      name: 'How to make your Robot fly higher than a plane'
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
