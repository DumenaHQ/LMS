import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';
import { QuizService } from 'src/app/services/quiz.service';


@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit {
  course: any;
  currentCourseParams: any;
  currentModuleIndex: number = 0;
  isWatchLessonModal: boolean = false;
  lessonVideoUrl: string;
  contentId: any = 'modules';
  addQuizToCourse: boolean = false;
  quizzes: any;
  moduleId: string;
  lessonId: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private coursesService: CoursesService,
    private quizzesService: QuizService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.currentCourseParams = this.activatedRoute.snapshot.params;
    this.getCourse();
  }
  
  // Get Course
  getCourse() {
    this.coursesService.getCourse(this.currentCourseParams.courseId).subscribe({
      next: (res: any) => {
        this.course = res.data.course;
        if(res.data.course.quiz_id) {
          this.getCourseQuiz(res.data.course.quiz_id);
        } else {
          this.quizzes = [];
        }
      },
      error: (e) => console.error(e),
    });
  }
  
  // Get coure quiz
  getCourseQuiz(quizId: any) {
    this.quizzesService.getquizByQuizId(quizId).subscribe({
      next: (res: any) => {
        this.quizzes = res.data.quiz;
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

  // open add quiz to course modal
  openAddQuizToCourse(moduleId: string, lessonId: string) {
    this.moduleId = moduleId;
    this.lessonId = lessonId;
    this.addQuizToCourse = true;
  }

  // Close add quiz to course modal
  closeAddQuizToCourse() {
    this.addQuizToCourse = false;
  }
  
  // close logout modal
  closeWatchLessonModal() {
    this.isWatchLessonModal = false;
  }

  // Tab change
  tabChange(ids: any) {
    this.contentId = ids;
  }

  goToAddModulePage() {
    this.router.navigate([`/admin/courses/${this.currentCourseParams.courseId}/modules`]);
  }

  viewLessonQuiz(moduleName: string, moduleId: string, lessonName: string, lessonId: string, quizId: string) {
    this.router.navigate([`/admin/courses/${this.currentCourseParams.courseId}/${moduleName}/${moduleId}/${lessonName}/${lessonId}/quiz/${quizId}/details`]);
  }

}
