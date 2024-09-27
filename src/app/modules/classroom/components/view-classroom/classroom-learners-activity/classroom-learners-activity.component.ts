import { Component, OnInit } from '@angular/core';
import { ActivityService } from 'src/app/services/activity.service';

@Component({
  selector: 'app-classroom-learners-activity',
  templateUrl: './classroom-learners-activity.component.html',
  styleUrls: ['./classroom-learners-activity.component.scss']
})
export class ClassroomLearnersActivityComponent implements OnInit {

  learnersActivities: any;
  dataLoading: boolean;

  constructor(
    private activityService: ActivityService,
  ) { }

  ngOnInit(): void {
    this.getLearnersActivities();
  }

  getLearnersActivities() {
    this.activityService.getSchoolLearnersActivities().subscribe({
      next: (res: any) => {
        this.learnersActivities = res.data; 
        this.dataLoading = false;
      },
      error: (e) => {
        console.error(e)
        this.dataLoading = false;
      },
    });
  }

}
