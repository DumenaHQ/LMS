import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
declare var google: any;

@Component({
  selector: 'app-instructor-overview',
  templateUrl: './instructor-overview.component.html',
  styleUrls: ['./instructor-overview.component.scss']
})
export class InstructorOverviewComponent implements OnInit {

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

    // Load the Visualization API and the corechart package.
    google.charts.load('current', {'packages':['corechart']});
    this.buildChart()
    this.buildChart2()

  }

  // Build chart
  buildChart() {
    // let id = `chart-${index}` 
    var func = (chart: any) => {
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Topping');
      data.addColumn('number', 'count');
      data.addRows([
        ['Mon', 0],
        ['Tue', 0],
        ['Wed', 0], 
        ['Thur', 0],
        ['Frid', 0],
        ['Sat', 0],
        ['Sun', 0]
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

