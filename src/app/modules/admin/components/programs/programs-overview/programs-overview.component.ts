import { Component, OnInit } from '@angular/core';
import { ProgramsService } from 'src/app/services/programs.service';

@Component({
  selector: 'app-programs-overview',
  templateUrl: './programs-overview.component.html',
  styleUrls: ['./programs-overview.component.scss'],
})
export class ProgramsOverviewComponent implements OnInit {
  allPrograms = [
    {
      id: 1,
      thumbnail: '../../../assets/img/thumbnail-1.png',
      name: 'What do you know about Robots Quiz',
      quadrant: 'Developer',
      lessonNumber: 9,
      duration: '12 hrs',
      status: true,
      isDeleted: false,
    },
    {
      id: 2,
      thumbnail: '../../../assets/img/thumbnail-2.png',
      name: 'Master Design Thinking Quiz',
      quadrant: 'Designer',
      lessonNumber: 9,
      duration: '12 hrs',
      status: false,
      isDeleted: false,
    },
    {
      id: 3,
      thumbnail: '../../../assets/img/thumbnail.svg',
      name: 'Roblox in 30 Days Quiz',
      quadrant: 'Innovator',
      lessonNumber: 9,
      duration: '12 hrs',
      status: false,
      isDeleted: false,
    },
  ];
  allCourses: any;
  dataLoading: boolean = true;
  programs: any;
  days: number = 0;

  constructor(private programsService: ProgramsService) {}

  ngOnInit(): void {
    // Get programs
    this.programsService.getAllPrograms().subscribe({
      next: (res: any) => {
        this.programs = res.data.programs;
        this.programs.forEach((p: any) => {
          // this.setTimeframe(p.start_date);
        });
      },
      error: (e) => console.error(e),
      complete: () => {
        this.dataLoading = false;
      },
    });
  }

  // Set timeframe
  // setTimeframe(date: string) {
  //   var futureDate = new Date(date).getTime();
  //   var currentDate = new Date().getTime();
  //   var timeLeft = futureDate - currentDate;

  //   this.days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  // }
}
