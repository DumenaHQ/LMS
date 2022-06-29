import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  allCourses = [
    {
      id: 1,
      thumbnail: '../../../assets/img/thumbnail-1.png',
      name: 'What do you know about Robots Quiz',
      quadrant: 'Developer',
      lessonNumber: 9,
      duration: '12 hrs',
      status: true,
      isDeleted: false
    },
    {
      id: 2,
      thumbnail: '../../../assets/img/thumbnail-2.png',
      name: 'Master Design Thinking Quiz',
      quadrant: 'Designer',
      lessonNumber: 9,
      duration: '12 hrs',
      status: false,
      isDeleted: false
    },
    {
      id: 3,
      thumbnail: '../../../assets/img/thumbnail.svg',
      name: 'Roblox in 30 Days Quiz',
      quadrant: 'Innovator',
      lessonNumber: 9,
      duration: '12 hrs',
      status: false,
      isDeleted: false
    },
  ]

  isDisplayGrid: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
