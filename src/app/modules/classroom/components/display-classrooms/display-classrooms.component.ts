import { Component, OnInit } from '@angular/core';
import { ClassroomService } from 'src/app/services/classroom.service';
import { ClassroomModel } from '../../models/classroom.model';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-display-classrooms',
  templateUrl: './display-classrooms.component.html',
  styleUrls: ['./display-classrooms.component.scss']
})
export class DisplayClassroomsComponent implements OnInit {

  classrooms?: ClassroomModel[];
  dataLoading: boolean = true;
  user: any;

  constructor(
    private classroomService: ClassroomService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.user = this.authService.getUser().user;    
    this.getClassrooms();
  }

  getClassrooms() {
    this.classroomService.getClassrooms().subscribe({
      next: (res: any) => {
        this.classrooms = (res.data.classes || []);
      },
      error: (e) => console.error(e),
      complete: () => {
        this.dataLoading = false;
      },
    });
  }

  goToAddClassroom() {
    this.router.navigate([`/school/classrooms/add-classroom`]);
  }

}
