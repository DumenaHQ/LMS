import { AfterContentInit, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
  currentCourseId: any;
  course: any;
  videoClicked: boolean = false;
  isModuleLessons: boolean = false;
  modules: any;
  currentModuleIndex: number = 0;
  currentLessonIndex: number = 0;
  lessonVideoUrl: string = ''


  renderedNote: SafeHtml;
  // items: any[]

  constructor(
    private activatedRoute: ActivatedRoute,
    private coursesService: CoursesService,
    private requireService: RequireService,
    private router: Router,
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef
  ) { }


  ngOnInit(): void {

    var MarkdownIt = this.requireService.markdownIt()
    var md = new MarkdownIt();

 


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
        this.renderedNote = this.sanitizer.bypassSecurityTrustHtml(md.render(this.course.modules[0].lessons[0].note??"## No note"));
        console.log(this.renderedNote)

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

  //Render Notes As HTML
  renderMarkdown(note:string){
    var MarkdownIt = this.requireService.markdownIt()
    var md = new MarkdownIt();
    this.renderedNote = this.sanitizer.bypassSecurityTrustHtml(md.render(note??"## No note"))
  return this.renderedNote;
}
  // Start Video
  // startVideo(): void {
  //   this.videoClicked = !this.videoClicked;
  //   this.videoPlayer.nativeElement.play();
  // }

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
