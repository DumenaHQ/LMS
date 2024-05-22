import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TeachersService } from 'src/app/services/teachers.service';
import { TeacherModel } from '../models/teacher.model';

@Component({
  selector: 'app-display-school-teachers',
  templateUrl: './display-school-teachers.component.html',
  styleUrls: ['./display-school-teachers.component.scss']
})
export class DisplaySchoolTeachersComponent implements OnInit {

  teachers!: TeacherModel[];
  dataLoading: boolean = true;
  user: any;
  addEditTeacher: boolean = false;

  constructor(
    private teachersService: TeachersService,
    private router: Router,
    private authService: AuthService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {  
    this.user = this.authService.getUser().user; 
    this.getTeachers();
  }

  getTeachers() {
    this.teachersService
      .fetchTeachersInSchool({
        id: this.user.id,
      })
      .subscribe({
        next: (res: any) => {
          this.teachers = res.data.teachers;
        },
        error: (e) => console.error(e),
        complete: () => {
          this.dataLoading = false;
          this.changeDetectorRef.detectChanges();
        },
      });
  }

  toggleAddEditTeacher() {
    this.addEditTeacher = !this.addEditTeacher;
  }

}
