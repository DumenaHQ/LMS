import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertType, AppAlertService } from 'src/app/services/app-alerts/app-alert.service';
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
    private courseService: CoursesService,
    private authService: AuthService,
    private router: Router,
    private appAlertService: AppAlertService,
  ) { }


  ngOnInit(): void {
    this.currentCourseParams = this.activatedRoute.snapshot.params;
    this.getModuleAndLessonIndex();
    this.user = this.authService.getUser().user;
  }
  
  getCourse() {
    this.courseService
    .getCourse(this.currentCourseParams.courseId)
    .subscribe((res: any) => {
      this.course = res.data.course;
      this.modules = this.course.modules;
      this.lessonVideoUrl = this.course?.modules[this.currentModuleIndex]?.lessons[this.currentLessonIndex]?.lesson_video;
    });
  }
  
  getModuleAndLessonIndex() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.currentModuleIndex = params['moduleIndex'] ? parseInt(params['moduleIndex'], 10) : 0;
      this.currentLessonIndex = params['lessonIndex'] ? parseInt(params['lessonIndex'], 10) : 0;

      this.activeIndex = this.currentModuleIndex;
      this.getCourse();
    });
  }

  getPreviousModuleAndLesson(moduleIndex: number, lessonIndex: number) {
    let previousModuleId, previousLessonId;
    if (lessonIndex > 0) {
      // Same module, previous lesson
      previousModuleId = this.modules[moduleIndex].id;
      previousLessonId = this.modules[moduleIndex].lessons[lessonIndex - 1].id;
    } else if (moduleIndex > 0) {
      // Previous module, last lesson
      const previousModule = this.modules[moduleIndex - 1];
      previousModuleId = previousModule.id;
      previousLessonId = previousModule.lessons[previousModule.lessons.length - 1].id;
    } else {
      console.log('No previous lesson.');
      this.watchLesson(moduleIndex, lessonIndex);
      return;
    }

    this.canViewNextLesson(moduleIndex, lessonIndex, previousModuleId, previousLessonId);
  }

  canViewNextLesson(moduleIndex: any, lessonIndex: any, moduleId: any, lessonId: any) {
    this.courseService
    .checkIfLessonIsReady(this.currentCourseParams.courseId, moduleId, lessonId)
    .subscribe((res: any) => {
      console.log(res);
      if(res.data.canTakeNextLesson === true) {
        this.watchLesson(moduleIndex, lessonIndex);
      } else if(res.data.canTakeNextLesson === false) {
        if(res.data.message === 'Score below pass mark')
        this.appAlertService.showAlert('Kindly complete previous lesson quiz to proceed. You scored below pass mark', AlertType.Warning);
      }
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

  checkIfActiveLesson(moduleIndex: number, lessonIndex: number) {
    const checkCurrentLesson = `${this.currentModuleIndex}${this.currentLessonIndex}` === `${moduleIndex}${lessonIndex}`;
    return checkCurrentLesson;
  }

  goBackToCourseInfo() { 
    this.router.navigate([`/${this.user.role}/classrooms/courses/${this.currentCourseParams.courseId}`]);
  }

  viewQuiz(quiz_id: any) {
    this.router.navigate([`${this.user.role}/classrooms/courses/${this.currentCourseParams.courseId}/lessons/quiz/${quiz_id}`]);
  }

  toggleAccordion(index: number) {
    if (this.activeIndex === index) {
      this.activeIndex = null;
    } else {
      this.activeIndex = index;
    }
  }

}
