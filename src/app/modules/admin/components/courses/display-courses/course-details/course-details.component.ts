import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';


@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit {
  name: any;
  course: any;
  currentCourse: any;
  isModuleLessons: boolean = false;
  moduleLessons: any;
  moduleIndex: number = 0;

  // sub: any
  constructor(
    private activatedRoute: ActivatedRoute,
    private coursesService: CoursesService

  ) { }

  ngOnInit(): void {

    // Get Current Program
    this.currentCourse = this.activatedRoute.snapshot.params;

    // Get Course
    this.coursesService.getCourse(this.currentCourse.courseId).subscribe({
      next: (res: any) => {
        this.course = res.data.course;
        console.log(this.course);

        // Get first module lesson
        this.getModuleLessons(this.course.modules[0].id, this.moduleIndex)
      },
      error: (e) => console.error(e),
      complete: () => {
        // this.dataLoading = false;
      },
    });
    // this.route.queryParams.subscribe((params: any) => {
    //   this.name = params['name']
    // })
    // this.sub = this.route.data.subscribe((v: any) => {
    //   // console.log(v)
    // })
  }

  // Get Module lessons
  getModuleLessons(moduleId: string, moduleIndex: number) {
    this.coursesService
      .getModuleLessons(this.currentCourse.courseId, moduleId)
      .subscribe((res: any) => {
        // Get course
        this.moduleLessons = res.data.module;
        console.log(res);
        if(res.status === true) {
          // this.isModuleLessons = true
          this.moduleIndex = moduleIndex
        }
        
        
      });
  }

  // ngOnDestroy(): void {
  //   this.sub.unsubscribe()

  // }

}
