import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';
import { QueryActiveTabService } from 'src/app/services/utils/query-active-tab.service';

type DisplayTypes = 'grid' | 'list';


@Component({
  selector: 'app-display-courses',
  templateUrl: './display-courses.component.html',
  styleUrls: ['./display-courses.component.scss']
})
export class DisplayCoursesComponent implements OnInit {

  displayType: DisplayTypes = 'grid';
  courses: any;
  dataLoading: boolean = true;

  constructor(
    private coursesService: CoursesService,
    private queryActiveTabService: QueryActiveTabService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      if(params['activeTab']) {
        this.displayType = params['activeTab'];
      }
    });

    this.getCourses();
  }
  
  getCourses() {
    this.coursesService.getAllCourses().subscribe({
      next: (res: any) => {
        this.courses = res.data.courses;
      },
      error: (e) => console.error(e),
      complete: () => {
        this.dataLoading = false;
      },
    });
  }

  // Set display type
  setDisplayType(displayType: DisplayTypes) {
    this.displayType = displayType;
    this.queryActiveTabService.setActiveTabInQueryParams(displayType);
  }

}
