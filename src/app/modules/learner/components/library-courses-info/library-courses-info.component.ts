import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-library-courses-info',
  templateUrl: './library-courses-info.component.html',
  styleUrls: ['./library-courses-info.component.scss']
})
export class LibraryCoursesInfoComponent implements OnInit {

  courseContent = [
    {
      id: 1,
      name: 'Introduction to Robotics'
    },
    {
      id: 2,
      name: 'How to make your own Robots'
    },
    {
      id: 3,
      name: 'Robots are the future of tech'
    },
    {
      id: 4,
      name: 'What do you know about Robots Quiz'
    },
    {
      id: 5,
      name: 'Programming your Robot to do cool stuff'
    },
    {
      id: 6,
      name: 'Is your Robot malfunctioning?'
    },
    {
      id: 7,
      name: 'How to make your Robot fly higher than a plane'
    },
  ]

  currentCourseId: any;
  currentCourse: any

  constructor(private activatedRoute: ActivatedRoute, private coursesService: CoursesService) { }

  ngOnInit(): void {
    // Get the current course Id from the url
    this.activatedRoute.params.subscribe((params: any) => {
      this.currentCourseId = params.id
    })

    // Get current Course with the Id
    this.coursesService.getCourse(this.currentCourseId).subscribe((res: any) => {
      this.currentCourse = res.data.course
      console.log(this.currentCourse)
    })
  }

}
