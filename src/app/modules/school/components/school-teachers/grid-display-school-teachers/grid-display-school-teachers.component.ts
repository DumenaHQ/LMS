import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProgramsService } from 'src/app/services/programs.service';
import { TeachersService } from 'src/app/services/teachers.service';
import { TeacherlModel } from '../models/teacher.model';

@Component({
  selector: 'app-grid-display-school-teachers',
  templateUrl: './grid-display-school-teachers.component.html',
  styleUrls: ['./grid-display-school-teachers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GridDisplaySchoolTeachersComponent  implements OnInit {

  dataLoading: boolean = true;
  teachers!: TeacherlModel[];
  user: any;
  loading: boolean = false;
  isAlert: boolean = false;
  alertMessage: string;
  alertColor: string

  constructor(
    private teachersService: TeachersService,
    private router: Router,
    private authService: AuthService,
    private cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    // Get User data from localstorage
    let userData = this.authService.getUser();
    this.user = userData.user;

    // Get programs
    this.teachersService.fetchTeachers(
      {
        id: this.user.id,
      }
    ).subscribe({
      next: (res: any) => {
        this.teachers = res.data.teachers;
        console.log(this.teachers);
      },
      error: (e) => console.error(e),
      complete: () => {
        this.dataLoading = false;
        this.cd.detectChanges();
      },
    });
  }

  openAddTeacherModal() {
    this.router.navigate(['/school/teachers/add']);
  }

  // Add Parent to Program
  // addParentToProgram(programId: string) {
  //   this.loading = true;

  //   let payload = {
  //     parents: [
  //       {
  //         user_id: this.user.id,
  //         name: this.user.fullname,
  //       },
  //     ],
  //   };
    
  //   this.programsService.addParentToProgram(payload, programId).subscribe({
  //     next: (res: any) => {
  //       console.log(res);

  //       if (res.status === true) {
  //         this.showAlertPopup(res.message, 'success');

  //         setTimeout(() => {
  //           this.router.navigate([`/parent/programs/${programId}`]);
  //         }, 3000);
  //       }
  //     },
  //     error: (e) => console.error(e),
  //     complete: () => {
  //       this.loading = false;
  //     },
  //   });
  // }

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

    // this.programsService.addSchoolToProgram(payload, programId).subscribe({
    //   next: (res: any) => {
    //     console.log(res);

    //     if (res.status === true) {
    //       this.showAlertPopup(res.message, 'success');

    //       setTimeout(() => {
    //         this.router.navigate([`/school/programs/${programId}`]);
    //       }, 3000);
    //     }
    //   },
    //   error: (e) => console.error(e),
    //   complete: () => {
    //     this.loading = false;
    //   },
    // });
  }

  // Display program
  displayProgram(programId: string) {
    this.router.navigate([`/${this.user.role}/teachers/${programId}`]);
  }

  // Delete program
  deleteProgram(program: any) {
    // this.programsService.deleteProgram(program.id).subscribe({
    //   next: (res: any) => {
    //     console.log(res);
    //     this.teachers;
    //   },
    //   error: (e) => console.error(e),
    //   // complete: () => {
    //   //   this.dataLoading = false;
    //   // },
    // });
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