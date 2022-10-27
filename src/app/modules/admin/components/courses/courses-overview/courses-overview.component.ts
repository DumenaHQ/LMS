import { Component, OnInit } from '@angular/core';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-courses-overview',
  templateUrl: './courses-overview.component.html',
  styleUrls: ['./courses-overview.component.scss'],
})
export class CoursesOverviewComponent implements OnInit {
  allCourses2 = [
    {
      id: 1,
      thumbnail: '../../../assets/img/thumbnail-1.png',
      name: 'What do you know about Robots Quiz',
      quadrant: 'Developer',
      lessonNumber: 9,
      duration: '12 hrs',
      status: true,
      isDeleted: false,
    },
    {
      id: 2,
      thumbnail: '../../../assets/img/thumbnail-2.png',
      name: 'Master Design Thinking Quiz',
      quadrant: 'Designer',
      lessonNumber: 9,
      duration: '12 hrs',
      status: false,
      isDeleted: false,
    },
    {
      id: 3,
      thumbnail: '../../../assets/img/thumbnail.svg',
      name: 'Roblox in 30 Days Quiz',
      quadrant: 'Innovator',
      lessonNumber: 9,
      duration: '12 hrs',
      status: false,
      isDeleted: false,
    },
  ];

  isDisplayGrid: boolean = true;
  allCourses: any;
  dataLoading: boolean = true;

  constructor(private coursesService: CoursesService) {}

  ngOnInit(): void {
    this.coursesService.getAllCourses().subscribe({
      next: (res: any) => {
        this.allCourses = res.data.courses;
        console.log(this.allCourses);
      },
      error: (e) => console.error(e),
      complete: () => {
        this.dataLoading = false;
      },
    });
  }
}
