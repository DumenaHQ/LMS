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
  moduleId: string = '63e647f34972099c1735b7fe'
  modules = [
    {
      id: 1,
      title: 'Module 1',
      lessons: [
        {
          id: 1.1,
          title: 'Lesson 1.1',
        },
        {
          id: 1.2,
          title: 'Lesson 1.2',
        },
        {
          id: 1.3,
          title: 'Lesson 1.2',
        }
      ]
    },
    {
      id: 2,
      title: 'Module 2',
      lessons: [
        {
          id: 2.1,
          title: 'Lesson 2.1',
        },
        {
          id: 2.2,
          title: 'Lesson 2.2',
        },
        {
          id: 2.3,
          title: 'Lesson 2.2',
        }
      ]
    },
  ]
  modules2: any;

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
        console.log(this.course);
        
      });

    // Get Module lessons
    this.coursesService
      .getModuleLessons(this.currentCourseId.courseId, this.moduleId)
      .subscribe((res: any) => {
        // Get course
        this.modules2 = res.data.course;
        console.log(res);
        
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
