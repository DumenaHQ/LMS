import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClassroomService } from 'src/app/services/classroom.service';
import { ProgramsService } from 'src/app/services/programs.service';

@Component({
  selector: 'app-grid-display-school-classrooms',
  templateUrl: './grid-display-school-classrooms.component.html',
  styleUrls: ['./grid-display-school-classrooms.component.scss']
})
export class GridDisplaySchoolClassroomsComponent implements OnInit {

  @Input() classrooms: any;
  @Input() days: any;
  classroomName: any;

  deleteModal: boolean = false;
  deleteUrl: string;
  deleteRoutePath: string;

  constructor(
    private classroomService: ClassroomService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  // Display program
  displayClassroom(classroomId: string) {
    this.router.navigate([`/school/classrooms/${classroomId}/view-classroom`]);
  }

  // Open Confirm Delete Modal
  openDeleteModal(classroom: any) {

    console.log(classroom);
    this.classroomName = classroom.name
    
    this.deleteModal = true;

    this.deleteUrl = `classes/${classroom.id}`
    this.deleteRoutePath = '/school/classrooms'
  }

  // Close Confirm Delete Modal
  closeDeleteModal() {
    this.deleteModal = false;
  }

  // Delete classroom
  deleteClassroom(classroom: any) {
  //   this.classroomService.deleteProgram(classroom.id).subscribe({
  //     next: (res: any) => {
  //       console.log(res);
  //       this.classrooms;
  //     },
  //     error: (e) => console.error(e),
  //     // complete: () => {
  //     //   this.dataLoading = false;
  //     // },
  //   });
  }

}
