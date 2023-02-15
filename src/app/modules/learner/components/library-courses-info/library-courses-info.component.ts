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
