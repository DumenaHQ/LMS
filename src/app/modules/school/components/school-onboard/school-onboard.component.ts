import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-school-onboard',
  templateUrl: './school-onboard.component.html',
  styleUrls: ['./school-onboard.component.scss']
})
export class SchoolOnboardComponent implements OnInit {

  @Output() isOnboarding: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  // close Onboarding modal
  closeOnboardModal() {
    this.isOnboarding.emit();
  }

}
