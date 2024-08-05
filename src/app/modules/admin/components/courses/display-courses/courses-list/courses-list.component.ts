import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {

  @Input() courses: any;
  activeIndex: number | null = null;
  confirmModal: boolean = false;

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
  }

  viewCourse(courseId: string) {
    this.router.navigate([`/admin/courses/${courseId}/details`]);
  }

  // Open Confirm Delete Modal
  openConfirmModal(course: any) {
    this.confirmModal = true;
    // this.confirmMessage = `Are you sure you want to delete ${course.name}?`;
    // this.confirmUrl = `classes/${course.id}`;
  }

  toggleAction(index: number) {
    if (this.activeIndex === index) {
      this.activeIndex = null;
    } else {
      this.activeIndex = index;
    }
  }

}
