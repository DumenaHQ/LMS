import { Component, OnInit } from '@angular/core';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-display-courses',
  templateUrl: './display-courses.component.html',
  styleUrls: ['./display-courses.component.scss']
})
export class DisplayCoursesComponent implements OnInit {

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
