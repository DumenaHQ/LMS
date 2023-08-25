import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClassroomService } from 'src/app/services/classroom.service';

@Component({
  selector: 'app-grid-display-admin-class-template',
  templateUrl: './grid-display-admin-class-template.component.html',
  styleUrls: ['./grid-display-admin-class-template.component.scss']
})
export class GridDisplayAdminClassTemplateComponent implements OnInit {

  @Input() classTemplates: any;
  classroomName: any;

  deleteModal: boolean = false;
  deleteUrl: string;
  deleteRoutePath: string;

  constructor(
    private classroomService: ClassroomService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  // Display Class Template
  displayClassTemplate(classTemplateId: string) {
    this.router.navigate([`/admin/class-templates/${classTemplateId}/view-class-template`]);
  }

  // Open Confirm Delete Modal
  // openDeleteModal(classroom: any) {

  //   console.log(classroom);
  //   this.classroomName = classroom.name
    
  //   this.deleteModal = true;

  //   this.deleteUrl = `classes/${classroom.id}`
  //   this.deleteRoutePath = '/school/classrooms'
  // }

  // // Close Confirm Delete Modal
  // closeDeleteModal() {
  //   this.deleteModal = false;
  // }

  // // Delete classroom
  // deleteClassroom(classroom: any) {
  // //   this.classroomService.deleteProgram(classroom.id).subscribe({
  // //     next: (res: any) => {
  // //       console.log(res);
  // //       this.classrooms;
  // //     },
  // //     error: (e) => console.error(e),
  // //     // complete: () => {
  // //     //   this.dataLoading = false;
  // //     // },
  // //   });
  // }

}
