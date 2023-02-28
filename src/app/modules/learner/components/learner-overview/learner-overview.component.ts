import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
declare var google: any;

@Component({
  selector: 'app-learner-overview',
  templateUrl: './learner-overview.component.html',
  styleUrls: ['./learner-overview.component.scss'],
})
export class LearnerOverviewComponent implements OnInit {
  elem: any;
  stepValue = 40;
  user: any;
  isOnboarding: boolean = true;
  public greeting: string = ''

  constructor(private authService: AuthService) {}

  ngOnInit(): void {

    // Get greeting
    this.greeting = this.authService.getGreeting() 
    
    // Get user data from localstorage
    let userData = this.authService.getUser();
    this.user = userData.user;

    this.progressBar();

    // Load the Visualization API and the corechart package.
    google.charts.load('current', {'packages':['corechart']});
    this.buildChart()
    this.buildChart2()

  }

  // close Onboarding modal
  closeOnboardModal() {

    // this.isOnboarding = false

    let payload = {
      isUserOnboarded: true,
    }
    console.log(payload);
    
    // update user profile
    this.authService.updateUser(payload).subscribe((res: any) => {
      console.log(res);
      if (res.status == true) {
        
        // Set User data
        this.authService.addUserDataToLocalStorage(res.data);
        this.ngOnInit()
      }
    });
  }

  // Progress Bar
  progressBar() {
    this.elem = document.getElementById('bar');

    this.elem.style.width = this.stepValue + '%';
    // this.elem.innerHTML = this.stepValue + '%' + ' complete';
    this.stepValue = this.stepValue + 10;
  }

  // Build chart
  buildChart() {
    // let id = `chart-${index}` 
    var func = (chart: any) => {
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Topping');
      data.addColumn('number', 'count');
      data.addRows([
        ['Monday', 0],
        ['Tuesday', 0],
        ['Wednesday', 0], 
        ['Thursday', 0],
        ['Friday', 0],
        ['Saturday', 0],
        ['Sunday', 0]
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

  // Build chart
  buildChart2() {
    // let id = `chart-${index}` 
    var func = (chart: any) => {
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Topping');
      data.addColumn('number', 'count');
      data.addRows([
        ['Innovator', 10],
        ['Designer', 10],
        ['Maker', 10], 
        ['Developer', 10],
      ]);
      // var data = google.visualization.arrayToDataTable([
      //   // ['Quandrant', ''],
      //   ['Innovator', 0],
      //   ['Designer', 0],
      //   ['Maker', 0],
      //   ['Developer', 0],
      // ]);
      var options = {
        title: 'My Daily Activities',
        pieHole: 0.4,
        // width: 600,
        // height: 300,
        tooltip: { textStyle: { fontName: 'Lato', fontSize: 17 } }
      };
      chart().draw(data, options);
    }
    var chart = () => new google.visualization.PieChart(document.getElementById('donutchart'));
    // if(type == 'radio') {
    // } else if (type === 'checkbox') {
    //   var chart = () => new google.visualization.BarChart(document.getElementById(id));
    // }
    var callback = () => func(chart);

    // Draw the pie chart and bar chart when Charts is loaded
    google.charts.setOnLoadCallback(callback);
  }


}
