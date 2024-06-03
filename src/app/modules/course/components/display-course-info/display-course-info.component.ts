import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-display-course-info',
  templateUrl: './display-course-info.component.html',
  styleUrls: ['./display-course-info.component.scss']
})
export class DisplayCourseInfoComponent implements OnInit {

  currentCourse: any;
  course: any;
  user: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private coursesService: CoursesService,
    private autService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.autService.getUser().user;
    this.currentCourse = this.activatedRoute.snapshot.params;
    this.coursesService
      .getCourse(this.currentCourse.courseId)
      .subscribe((res: any) => {
        this.course = res.data.course;
      });
  }

  startCourse(moduleIndex: number) {
    this.router.navigate([
      `/${this.user.role}/classrooms/courses/${this.currentCourse.courseId}/lessons`,
    ], { queryParams: { moduleIndex: moduleIndex } });
  }

}
