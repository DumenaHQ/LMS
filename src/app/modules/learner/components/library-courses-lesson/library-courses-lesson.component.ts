import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-library-courses-lesson',
  templateUrl: './library-courses-lesson.component.html',
  styleUrls: ['./library-courses-lesson.component.scss'],
})
export class LibraryCoursesLessonComponent implements OnInit {
  @ViewChild('videoPlayer') videoPlayer: ElementRef;
  currentCourseId: any;
  course: any;
  currentCourseLesson: any;
  videoClicked: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private coursesService: CoursesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get the current course Id from the url
    this.currentCourseId = this.activatedRoute.snapshot.params;

    // Get current Course with the Id
    this.coursesService
      .getCourse(this.currentCourseId.courseId)
      .subscribe((res: any) => {
        // Get course
        this.course = res.data.course;
        this.course.lessons.forEach((e: any) => {
          // Get the current lesson with lesson id
          if (e.id === this.currentCourseId.lessonId) {
            this.currentCourseLesson = e;
          }
        });
      });
  }

  startVideo(): void {
    this.videoClicked = !this.videoClicked;
    this.videoPlayer.nativeElement.play();
  }

  // Change Lesson
  changeLesson(id: any) {
    this.router.navigate([`/learner/library/${this.course.id}/${id}`]);
    // this.currentCourseId.lessonId = id;
    this.ngOnInit();
    console.log('Yess');
  }

  // togglePlayPause() {
  //   const video = document.querySelector('.video')
  //   if(video.paused) {

  //   }
  // }
}
