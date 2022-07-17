import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-library-courses-lesson',
  templateUrl: './library-courses-lesson.component.html',
  styleUrls: ['./library-courses-lesson.component.scss']
})
export class LibraryCoursesLessonComponent implements OnInit {

  currentCourseId: any;
  currentCourse: any
  currentCourseLesson: any
  video: string = '';

  constructor(private activatedRoute: ActivatedRoute, private coursesService: CoursesService,) { }

  ngOnInit(): void {
    // Get the current course Id from the url
    this.activatedRoute.params.subscribe((params: any) => {
      this.currentCourseId = params.id
    })

    // Get current Course with the Id
    this.coursesService.getCourse(this.currentCourseId).subscribe((res: any) => {
      this.currentCourse = res.data.course
      this.video = this.currentCourse.lessons[0].video_url
      this.currentCourse.lessons.forEach((e: any) => {
        this.currentCourseLesson = e
      });
    })
  }

}
