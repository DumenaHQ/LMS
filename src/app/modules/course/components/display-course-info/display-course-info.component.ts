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

  activeParams: any;
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
    this.activeParams = this.activatedRoute.snapshot.params;
    this.coursesService
      .getCourse(this.activeParams.courseId)
      .subscribe((res: any) => {
        this.course = res.data.course;
      });
  }

  startCourse(moduleIndex: number) {
    this.router.navigate([
      `/${this.user.role}/${this.getRoutConfigPath()}/${this.activeParams.typeId}/${this.activeParams.typeName}/courses/${this.activeParams.courseId}/lessons`,
    ], { queryParams: { moduleIndex: moduleIndex } });
  }

  goBack() {
    this.router.navigate([`/${this.user.role}/${this.getRoutConfigPath()}/${this.activeParams.typeId}/view-classroom`]);
  }

  getRoutConfigPath() {
    const routhConfigPath = this.activatedRoute.snapshot.pathFromRoot[3].routeConfig?.path;
    return routhConfigPath;
  }

}
