import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-parent-onboard',
  templateUrl: './parent-onboard.component.html',
  styleUrls: ['./parent-onboard.component.scss'],
})
export class ParentOnboardComponent implements OnInit {
  @Output() isOnboarding: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  // close Onboarding modal
  closeOnboardModal() {
    this.isOnboarding.emit();
  }
}
