import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-courses-card',
  templateUrl: './courses-card.component.html',
  styleUrls: ['./courses-card.component.scss'],
})
export class CoursesCardComponent implements OnInit {
  // courses = [
  //   {
  //     id: 1,
  //     image: '../../../assets/img/library/library1.png',
  //     title: 'Introduction to Web Development',
  //     level: 'Beginner',
  //     lessonNumber: '9 Lessons',
  //     duration: '13 hrs',
  //   },
  //   {
  //     id: 2,
  //     image: '../../../assets/img/library/library2.png',
  //     title: 'Introduction to Robotics',
  //     level: 'Beginner',
  //     lessonNumber: '9 Lessons',
  //     duration: '13 hrs',
  //   },
  //   {
  //     id: 3,
  //     image: '../../../assets/img/library/library3.png',
  //     title: 'Introduction to Mobile Development',
  //     level: 'Beginner',
  //     lessonNumber: '9 Lessons',
  //     duration: '13 hrs',
  //   },
  //   {
  //     id: 4,
  //     image: '../../../assets/img/library/library4.png',
  //     title: 'Introduction to Web Development',
  //     level: 'Beginner',
  //     lessonNumber: '9 Lessons',
  //     duration: '13 hrs',
  //   },
  // ];

  @Input() quadrant: string = '';
  // private subject = new Subject<any>();
  allCourses: any;
  dataLoading: boolean = true;

  constructor(private coursesService: CoursesService) {}

  ngOnInit(): void {
    this.coursesService.getAllCourses().subscribe({
      next: (res: any) => {
        this.allCourses = res.data.courses;
        this.filterCourseQuadrant(this.quadrant);
      },
      error: (e) => console.error(e),
      complete: () => {
        this.dataLoading = false;
      },
    });

    // this.subject.next(this.quadrant);
    // this.subject.asObservable();
    // console.log(this.quadrant);
  }

  // Filter Course quadrant
  filterCourseQuadrant(keyword: any) {
    var filter = 'course_quadrant';
    // var keyword = 'Developer';

    var filteredData = this.allCourses.filter((obj: any) => {
      return obj[filter] === keyword;
    });
    // this.allCourses = filteredData

    console.log(filteredData);
  }
}
