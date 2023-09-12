import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';


@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit {
  name: any;
  course: any;
  currentCourseParams: any;
  moduleLessons: any;
  currentModuleIndex: number = 0;
  isWatchLessonModal: boolean = false;
  lessonVideoUrl: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private coursesService: CoursesService
  ) { }

  ngOnInit(): void {

    // Get Current Program
    this.currentCourseParams = this.activatedRoute.snapshot.params;

    // Get Course
    this.coursesService.getCourse(this.currentCourseParams.courseId).subscribe({
      next: (res: any) => {
        this.course = res.data.course;
        console.log(this.course);
      },
      error: (e) => console.error(e),
    });
  }

  // Get Module lessons
  getModuleIndex(moduleIndex: number) {
    this.currentModuleIndex = moduleIndex;
  }

  // open watch lesson modal
  openWatchLessonModal(lessonUrl: string) {
    this.isWatchLessonModal = true;

    this.lessonVideoUrl = lessonUrl;
  }
  
  // close logout modal
  closeWatchLessonModal() {
    this.isWatchLessonModal = false;
  }

}
