import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-library-courses-quiz',
  templateUrl: './library-courses-quiz.component.html',
  styleUrls: ['./library-courses-quiz.component.scss']
})
export class LibraryCoursesQuizComponent implements OnInit {
  currentCourseParams: any;
  course: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private coursesService: CoursesService,
  ) { }

  ngOnInit(): void {
    this.currentCourseParams = this.activatedRoute.snapshot.params;

    console.log(this.currentCourseParams);
    
    // Get current Course with the Id
    this.coursesService
      .getCourse(this.currentCourseParams.courseId)
      .subscribe((res: any) => {
        // Get course
        this.course = res.data.course;
      });
  }

  // Go back
  goToLibrary() {
    window.history.back();
  }

}
