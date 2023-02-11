import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-library-courses-info',
  templateUrl: './library-courses-info.component.html',
  styleUrls: ['./library-courses-info.component.scss'],
})
export class LibraryCoursesInfoComponent implements OnInit {
  currentCourse: any;
  course: any
  modules: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private coursesService: CoursesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get the current course Id from the url
    this.currentCourse = this.activatedRoute.snapshot.params;

    // Get current Course with the Id
    this.coursesService
      .getCourse(this.currentCourse.courseId)
      .subscribe((res: any) => {
        this.course = res.data.course;

        console.log(res);
        
        this.coursesService
          .getModuleLessons(this.currentCourse.courseId, this.course?.modules[2].id)
          .subscribe((res: any) => {
            this.modules = res.data.course;
    
            console.log(res);
            
          });
          // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNjM4OTZkZDQzYjRhZTRkZGYzZTViZSIsImZ1bGxuYW1lIjoiS2hpbmcgRGF2ZSIsImVtYWlsIjoiZGhleXZlZDFAZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaXNVc2VyT25ib2FyZGVkIjpmYWxzZSwiaWF0IjoxNjc2MDI4NTU1LCJleHAiOjE2NzYxMTQ5NTV9.df6ORqRSc5wR9Qf7DtlXh_Xx6bj6BAdqi4mBV1TvOQA
      });

  }

  // Start course
  startCourse() {
    // Route users to first lesson
    this.router.navigate([
      `/learner/library/${this.currentCourse.courseId}/${this.course?.modules[0].id}`,
    ]);
  }
}
