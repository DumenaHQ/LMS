import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-coming-soon',
  templateUrl: './coming-soon.component.html',
  styleUrls: ['./coming-soon.component.scss']
})
export class ComingSoonComponent implements OnInit {

  days: number = 0;
  hours: number = 0;
  mins: number = 0;
  secs: number = 0;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  // Set Interval for Countdown at 1sec
  x = setInterval(() => {
    var futureDate = new Date("July 2, 2022 10:00:00").getTime() // Sat Jul 02 2022 10:00:00 GMT+0100 (West Africa Standard Time) (Launch Date)
    var currentDate = new Date().getTime()
    var timeLeft = futureDate - currentDate

    this.days = Math.floor(timeLeft / (1000 * 60 * 60 * 24))
    this.hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    this.mins = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))
    this.secs = Math.floor((timeLeft % (1000 * 60)) / (1000))

    // Clear Interval
    if (timeLeft < 0) {
      clearInterval(this.x)
    }
  }, 1000)

}
