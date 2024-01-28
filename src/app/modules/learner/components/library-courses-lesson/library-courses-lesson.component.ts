import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';
import { RequireService } from './require_service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-library-courses-lesson',
  templateUrl: './library-courses-lesson.component.html',
  styleUrls: ['./library-courses-lesson.component.scss'],
})
export class LibraryCoursesLessonComponent implements OnInit {
  @ViewChild('videoPlayer') videoPlayer: ElementRef;
  currentCourseParams: any;
  course: any;
  videoClicked: boolean = false;
  isModuleLessons: boolean = false;
  modules: any;
  currentModuleIndex: number = 0;
  currentLessonIndex: number = 0;
  lessonVideoUrl: string = '';
  // items: any[]

  constructor(
    private activatedRoute: ActivatedRoute,
    private coursesService: CoursesService,
    private requireService: RequireService,
    private router: Router,
    private sanitizer: DomSanitizer,
  ) { }


  ngOnInit(): void {

    // Get the current course Id from the url
    this.currentCourseParams = this.activatedRoute.snapshot.params;

    // Get current Course with the Id
    this.coursesService
      .getCourse(this.currentCourseParams.courseId)
      .subscribe((res: any) => {
        console.log(res);
        
        // Get course
        this.course = res.data.course;
        this.modules = this.course.modules;
        this.lessonVideoUrl = this.course.modules[0].lessons[0].lesson_video;
      });
  }

  // Get Module lessons
  showModuleLessons() {
    this.isModuleLessons = true
  }

  // Watch Lesson
  watchLesson(moduleIndex: any, lessonIndex: any) {
    this.currentModuleIndex = moduleIndex
    this.currentLessonIndex = lessonIndex
  }

  playNextVideo() {
    this.currentLessonIndex++;
    this.lessonVideoUrl = this.course.modules[this.currentModuleIndex].lessons[this.currentLessonIndex].lesson_video
    if (this.currentLessonIndex < this.course.modules[this.currentModuleIndex].lessons.length - 1) {
      this.videoPlayer.nativeElement.src = this.lessonVideoUrl;
      this.videoPlayer.nativeElement.load();
      this.videoPlayer.nativeElement.play();
      console.log(this.currentLessonIndex);
    }

  }
}
