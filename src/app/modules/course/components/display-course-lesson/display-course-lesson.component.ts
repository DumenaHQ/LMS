import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-display-course-lesson',
  templateUrl: './display-course-lesson.component.html',
  styleUrls: ['./display-course-lesson.component.scss']
})
export class DisplayCourseLessonComponent implements OnInit {

  @ViewChild('videoPlayer') videoPlayer: ElementRef;
  currentCourseParams: any;
  course?: any;
  modules?: any;
  currentModuleIndex: number;
  currentLessonIndex: number;
  lessonVideoUrl: string = '';
  activeIndex: number | null = null;
  user: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private coursesService: CoursesService,
    private authService: AuthService,
    private router: Router,
  ) { }


  ngOnInit(): void {
    this.currentCourseParams = this.activatedRoute.snapshot.params;
    this.getModuleAndLessonIndex();
    this.user = this.authService.getUser().user;
  }
  
  getCourse() {
    this.coursesService
    .getCourse(this.currentCourseParams.courseId)
    .subscribe((res: any) => {res.data.course;
      this.course = res.data.course;
      this.modules = this.course.modules;
      this.lessonVideoUrl = this.course?.modules[this.currentModuleIndex]?.lessons[this.currentLessonIndex]?.lesson_video;
    });
  }
  
  getModuleAndLessonIndex() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.currentModuleIndex = params['moduleIndex'] ? parseInt(params['moduleIndex'], 10) : 0;
      this.currentLessonIndex = params['lessonIndex'] ? parseInt(params['lessonIndex'], 10) : 0;
      this.getCourse();
    });
  }

  watchLesson(moduleIndex: any, lessonIndex: any) {
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { moduleIndex: moduleIndex, lessonIndex: lessonIndex },
      queryParamsHandling: 'merge'
    });

    this.getModuleAndLessonIndex();
  }

  playNextVideo() {
    this.currentLessonIndex++;
    if (this.currentLessonIndex < this.course?.modules[this.currentModuleIndex]?.lessons.length) {
      this.lessonVideoUrl = this.course.modules[this.currentModuleIndex].lessons[this.currentLessonIndex].lesson_video;
      this.videoPlayer.nativeElement.src = this.lessonVideoUrl;
      this.videoPlayer.nativeElement.load();
      this.videoPlayer.nativeElement.addEventListener('loadeddata', () => {
        this.videoPlayer.nativeElement.play();
      }, { once: true }); 
    } else {
      this.currentLessonIndex = this.course.modules[this.currentModuleIndex].lessons.length - 1;
      // console.log('Reached the last lesson of the module. Stopping autoplay.');
    }
  }

  goBackToCourseInfo() { 
    this.router.navigate([`/${this.user.role}/classrooms/courses/${this.currentCourseParams.courseId}`]);
  }

  viewQuiz(quiz_id: any) {
    this.router.navigate([`${this.user.role}/classrooms/courses/${this.currentCourseParams.courseId}/lessons/quiz/${this.course?.quiz_id}`]);
  }

  toggleAccordion(index: number) {
    if (this.activeIndex === index) {
      this.activeIndex = null;
    } else {
      this.activeIndex = index;
    }
  }

}
