import { Component, OnInit } from '@angular/core';
import { SchoolService } from 'src/app/services/school.service';

@Component({
  selector: 'app-classroom-learners-activity',
  templateUrl: './classroom-learners-activity.component.html',
  styleUrls: ['./classroom-learners-activity.component.scss']
})
export class ClassroomLearnersActivityComponent implements OnInit {

  learnersActivities: any;

  constructor(
    private schoolService: SchoolService,
  ) { }

  ngOnInit(): void {
    this.getLearnersActivities();
  }

  getLearnersActivities() {
    this.schoolService.getSchoolLearnersActivities().subscribe({
      next: (res: any) => {
        this.learnersActivities = res.data;     
      },
      error: (e) => console.error(e),
    });
  }

}
