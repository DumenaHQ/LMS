import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityService } from 'src/app/services/activity.service';
import { AlertType, AppAlertService } from 'src/app/services/app-alerts/app-alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { ClassroomService } from 'src/app/services/classroom.service';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-display-course-lesson',
  templateUrl: './display-course-lesson.component.html',
  styleUrls: ['./display-course-lesson.component.scss']
})
export class DisplayCourseLessonComponent implements OnInit {

  @ViewChild('videoPlayer') videoPlayer: ElementRef;
  activeParams: any;
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
    private classroomService: ClassroomService,
    private authService: AuthService,
    private router: Router,
    private appAlertService: AppAlertService,
    private activityService: ActivityService
  ) { }


  ngOnInit(): void {
    this.activeParams = this.activatedRoute.snapshot.params;
    this.getCourse();
    this.user = this.authService.getUser().user;
  }
  
  getCourse() {
    const routhConfigPath = this.activatedRoute.snapshot.pathFromRoot[3].routeConfig?.path;
    if(routhConfigPath === 'classrooms') {
      this.classroomService
      .getClassroomCoursesById(this.activeParams.typeId, this.activeParams.courseId)
      .subscribe((res: any) => {
        this.setCourseModules(res);
      });
    } else {
      this.courseService
      .getCourse(this.activeParams.courseId)
      .subscribe((res: any) => {
        this.setCourseModules(res);
      });
    }
  }

  setCourseModules(res: any) {
    this.course = res.data.course;
    this.modules = this.course.modules;
    this.getModuleAndLessonIndex();
  }


  setLessonVideoUrl() {
    this.lessonVideoUrl = this.course?.modules[this.currentModuleIndex]?.lessons[this.currentLessonIndex]?.lesson_video;
    this.recordActivity('started_lesson');
  }
  
  getModuleAndLessonIndex() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.currentModuleIndex = params['moduleIndex'] ? parseInt(params['moduleIndex'], 10) : 0;
      this.currentLessonIndex = params['lessonIndex'] ? parseInt(params['lessonIndex'], 10) : 0;
      this.activeIndex = this.currentModuleIndex;
    });
    this.setLessonVideoUrl();
  }

  getPreviousModuleAndLesson(moduleIndex: number, lessonIndex: number, lessonQuizId: any, type: string) {
    if(this.user.role === 'learner') {
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
        if(type === 'lesson') {
          this.watchLesson(moduleIndex, lessonIndex);
        } else {
          this.viewQuiz(lessonQuizId);
        }
        return;
      }
  
      this.canViewNextLessonOrQuiz(moduleIndex, lessonIndex, previousModuleId, previousLessonId, lessonQuizId, type);
    } else {
      if(type === 'lesson') {
        this.watchLesson(moduleIndex, lessonIndex);
      } else {
        this.viewQuiz(lessonQuizId);
      }
    }
  }

  canViewNextLessonOrQuiz(moduleIndex: any, lessonIndex: any, moduleId: any, lessonId: any, lessonQuizId: any, type: string) {
    this.courseService
    .checkIfLessonIsReady(this.activeParams.courseId, moduleId, lessonId)
    .subscribe((res: any) => {
      if(res.data.canTakeNextLesson === true) {
        if(type === 'lesson') {
          this.watchLesson(moduleIndex, lessonIndex);
        } else {
          this.viewQuiz(lessonQuizId);
        }
      } else if(res.data.canTakeNextLesson === false) {
        if(res.data.message === 'Score below pass mark') {
          this.appAlertService.showAlert('Kindly complete previous lesson quiz to proceed. You scored below pass mark', AlertType.Warning);
        } else {
          this.appAlertService.showAlert(res.data.message, AlertType.Warning);
        }
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
  
  viewQuiz(lessonQuizId: string) {
    this.recordActivity('started_quiz');
    this.router.navigate([`${this.user.role}/${this.getRoutConfigPath()}/${this.activeParams.typeId}/${this.activeParams.typeName}/courses/${this.activeParams.courseId}/lessons/quiz/${lessonQuizId}`]);
  }
  
  goBack(type: number) { 
    if(type === 1) {
      this.router.navigate([`/${this.user.role}/${this.getRoutConfigPath()}/${this.activeParams.typeId}/view-classroom`]);
    } else {
      this.router.navigate([`/${this.user.role}/${this.getRoutConfigPath()}/${this.activeParams.typeId}/${this.activeParams.typeName}/courses/${this.activeParams.courseId}`]);
    }
  }

  getRoutConfigPath() {
    const routhConfigPath = this.activatedRoute.snapshot.pathFromRoot[3].routeConfig?.path;
    return routhConfigPath;
  }

  toggleAccordion(index: number) {
    if (this.activeIndex === index) {
      this.activeIndex = null;
    } else {
      this.activeIndex = index;
    }
  }

  recordActivity(activityType: string) {
    if(this.user.role === 'learner') {
      this.activityService.recordUserActivity(activityType).subscribe({
        next: (res: any) => { },
        error: (e) => console.error(e),
      });
    }
  }

}
