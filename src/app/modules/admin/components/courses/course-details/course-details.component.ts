import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss']
})
export class CourseDetailsComponent implements OnInit {
  name: any;

  sub: any
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // this.route.queryParams.subscribe((params: any) => {
    //   this.name = params['name']
    // })
    this.sub = this.route.data.subscribe((v: any) => {
      // console.log(v)
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe()

  }

}
