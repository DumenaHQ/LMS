import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProgramsService } from 'src/app/services/programs.service';
import { TeachersService } from 'src/app/services/teachers.service';
import { TeacherModel } from '../models/teacher.model';

@Component({
  selector: 'app-grid-display-school-teachers',
  templateUrl: './grid-display-school-teachers.component.html',
  styleUrls: ['./grid-display-school-teachers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridDisplaySchoolTeachersComponent implements OnInit {
  dataLoading: boolean = true;
  teachers!: TeacherModel[];
  user: any;
  loading: boolean = false;
  isAlert: boolean = false;
  alertMessage: string;
  alertColor: string;

  deleteModal: boolean = false;
  deleteUrl: string;
  deleteRoutePath: string;
  teacherName!: string;

  constructor(
    private teachersService: TeachersService,
    private router: Router,
    private authService: AuthService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Get User data from localstorage
    let userData = this.authService.getUser();
    this.user = userData.user;

    this.fetchTeachers();
  }

  fetchTeachers() {
    // Get teachers
    this.teachersService
      .fetchTeachersInSchool({
        id: this.user.id,
      })
      .subscribe({
        next: (res: any) => {
          this.teachers = res.data.teachers;
        },
        // error: (e) => console.error(e),
        complete: () => {
          this.dataLoading = false;
          this.cd.detectChanges();
        },
      });
  }

  openAddTeacherModal() {
    this.router.navigate(['/school/teachers/add']);
  }

  // Add School to program
  addSchoolToProgram(programId: string) {
    this.loading = true;

    let payload = {
      schools: [
        {
          user_id: this.user.id,
          name: this.user.fullname,
        },
      ],
    };
  }

  // Display program
  displayProgram(programId: string) {
    this.router.navigate([`/${this.user.role}/teachers/${programId}`]);
  }

  // Open Confirm Delete Modal
  openDeleteModal(teacher: TeacherModel) {
    console.log(teacher);
    this.teacherName = teacher.fullname || '';

    this.deleteModal = true;

    this.deleteUrl = `users/teacher/${teacher.id}`;
    this.deleteRoutePath = '';
  }

  // Close Confirm Delete Modal
  closeDeleteModal() {
    this.deleteModal = false;
  }

  // Show alert
  showAlertPopup(message: string, color: string) {
    // Set message
    this.alertMessage = message;
    // Set color
    this.alertColor = color;
    // Show Alert
    this.isAlert = true;
    // Hide Alert
    setTimeout(() => {
      this.isAlert = false;
    }, 3000);
  }
}
