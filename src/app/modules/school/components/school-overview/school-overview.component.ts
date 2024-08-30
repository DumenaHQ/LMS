import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ClassroomService } from 'src/app/services/classroom.service';
import { SchoolService } from 'src/app/services/school.service';
import { TeachersService } from 'src/app/services/teachers.service';
declare var google: any;

@Component({
  selector: 'app-school-overview',
  templateUrl: './school-overview.component.html',
  styleUrls: ['./school-overview.component.scss']
})
export class SchoolOverviewComponent implements OnInit {
  user: any;
  dataLoading: boolean = true;
  students: any;
  public greeting: string = ''
  classrooms: any;
  teachers: any;
  learnersActivities: any;

  constructor(
    private authService: AuthService,
    private schoolService: SchoolService,
    private classroomService: ClassroomService,
    private teachersService: TeachersService
  ) {}

  ngOnInit(): void {
    this.greeting = this.authService.getGreeting();
    this.user = this.authService.getUser().user;

    this.getSchoolLearners();
    this.getSchoolClassrooms();
    this.getSchoolTeachers();
    this.getLearnersActivities();

    // Load the Visualization API and the corechart package.
    google.charts.load('current', {'packages':['corechart']});
    this.buildChart()
  }

  getSchoolLearners() {
    this.schoolService.getSchoolLearners(this.user.id, undefined).subscribe({
      next: (res: any) => {
        this.students = res.data.students;
      },
      error: (e) => console.error(e),
    });
  }

  getSchoolClassrooms() {
    this.classroomService.getClassrooms().subscribe({
      next: (res: any) => {
        this.classrooms = res.data.classes;
      },
      error: (e) => console.error(e),
    });
  }

  getSchoolTeachers() {
    this.teachersService.fetchTeachersInSchool({ id: this.user.id }).subscribe({
      next: (res: any) => {
        this.teachers = res.data.teachers;
      },
      error: (e) => console.error(e),
    });
  }

  getLearnersActivities() {
    this.schoolService.getSchoolLearnersActivities().subscribe({
      next: (res: any) => {
        this.learnersActivities = res.data;     
      },
      error: (e) => console.error(e),
    });
  }  

  // Build chart
  buildChart() {
    // let id = `chart-${index}` 
    var func = (chart: any) => {
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Topping');
      data.addColumn('number', 'count');
      data.addRows([
        ['Jan', 0],
        ['Feb', 0],
        ['Mar', 0], 
        ['Apr', 0],
        ['May', 0],
        ['Jun', 0],
        ['Jul', 0],
        ['Aug', 0],
        ['Sep', 0],
        ['Oct', 0],
        ['Nov', 0],
        ['Dec', 0],
      ]);
      var options = {
        // width: 600,
        height: 300,
        tooltip: { textStyle: { fontName: 'Lato', fontSize: 17 } }
      };
      chart().draw(data, options);
    }
    var chart = () => new google.visualization.LineChart(document.getElementById('chart_div'));
    // if(type == 'radio') {
    // } else if (type === 'checkbox') {
    //   var chart = () => new google.visualization.BarChart(document.getElementById(id));
    // }
    var callback = () => func(chart);

    // Draw the pie chart and bar chart when Charts is loaded
    google.charts.setOnLoadCallback(callback);
  }

  // close Onboarding modal
  closeOnboardModal() {
    let payload = {
      isUserOnboarded: true,
    }
    
    // update user profile
    this.authService.updateUser(payload).subscribe((res: any) => {
      if (res.status == true) {
        this.authService.addUserDataToLocalStorage(res.data);
        this.ngOnInit()
      }
    });
  }

}
