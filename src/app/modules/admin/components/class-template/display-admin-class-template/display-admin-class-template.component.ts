import { Component, OnInit } from '@angular/core';
import { ClassroomService } from 'src/app/services/classroom.service';

@Component({
  selector: 'app-display-admin-class-template',
  templateUrl: './display-admin-class-template.component.html',
  styleUrls: ['./display-admin-class-template.component.scss']
})
export class DisplayAdminClassTemplateComponent implements OnInit {

  classTemplates: any;
  dataLoading: boolean = true;

  constructor(
    private classroomService: ClassroomService
  ) { }

  ngOnInit(): void {
    // Get classrooms
    this.classroomService.getClassroomTemplates().subscribe({
      next: (res: any) => {
        this.classTemplates = res.data.classTemplates;
        console.log({
          title: 'classrooms',
          data: res.data.classTemplates
        });
      },
      error: (e) => console.error(e),
      complete: () => {
        this.dataLoading = false;
      },
    });
  }


}
