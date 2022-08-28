import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-library-courses-info',
  templateUrl: './library-courses-info.component.html',
  styleUrls: ['./library-courses-info.component.scss'],
})
export class LibraryCoursesInfoComponent implements OnInit {
  courseContent = [
    {
      id: 1,
      name: 'Introduction to Robotics',
    },
    {
      id: 2,
      name: 'How to make your own Robots',
    },
    {
      id: 3,
      name: 'Robots are the future of tech',
    },
    {
      id: 4,
      name: 'What do you know about Robots Quiz',
    },
    {
      id: 5,
      name: 'Programming your Robot to do cool stuff',
    },
    {
      id: 6,
      name: 'Is your Robot malfunctioning?',
    },
    {
      id: 7,
      name: 'How to make your Robot fly higher than a plane',
    },
  ];

  currentCourse: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private coursesService: CoursesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get the current course Id from the url
    this.currentCourse = this.activatedRoute.snapshot.params;

    // Get current Course with the Id
    this.coursesService
      .getCourse(this.currentCourse.courseId)
      .subscribe((res: any) => {
        this.currentCourse = res.data.course;
      });
  }

  // Start course
  startCourse() {
    // Route users to first lesson
    this.router.navigate([
      `/learner/library/${this.currentCourse.id}/${this.currentCourse?.lessons[0].id}`,
    ]);
  }
}
