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
  videoClicked: boolean = false;
  isModuleLessons: boolean = false;
  modules: any;
  currentModuleIndex: number = 0;
  currentLessonIndex: number = 0;
  lessonVideoUrl: string = ''

  // items: any[]

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
        this.modules = this.course.modules
        console.log(this.course);
        console.log(this.modules);
        this.lessonVideoUrl = this.course.modules[0].lessons[0].lesson_video
        console.log(this.lessonVideoUrl);
        
        
      });

      // this.items = [
      //   { header: 'Header 1', body: 'Body 1' },
      //   { header: 'Header 2', body: 'Body 2' },
      //   { header: 'Header 3', body: 'Body 3' },
      // ];

      // this.items.forEach(item => {
      //   item.isOpen = false;
      // });
  }

  // Get Module lessons
  showModuleLessons() {
    this.isModuleLessons = true
    // this.coursesService
    //   .getModuleLessons(this.currentCourseId.courseId, moduleId)
    //   .subscribe((res: any) => {
    //     // Get course
    //     this.moduleLessons = res.data.module;
    //     console.log(res);
    //     if(res.status === true) {
    //       this.isModuleLessons = true
    //     }
        
        
    //   });
  }

  // Watch Lesson
  watchLesson(moduleIndex: any, lessonIndex: any) {
    // this.lessonVideoUrl = lessonVideo
    this.currentModuleIndex = moduleIndex
    this.currentLessonIndex = lessonIndex
  } 

  // Start Video
  startVideo(): void {
    this.videoClicked = !this.videoClicked;
    this.videoPlayer.nativeElement.play();
  }

  // togglePlayPause() {
  //   const video = document.querySelector('.video')
  //   if(video.paused) {

  //   }
  // }

  // toggle(item: any) {
  //   this.items.forEach(i => {
  //     if (i === item) {
  //       i.isOpen = !i.isOpen;
  //     } else {
  //       i.isOpen = false;
  //     }
  //   });
  // }
}
