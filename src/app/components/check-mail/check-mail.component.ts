import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-check-mail',
  templateUrl: './check-mail.component.html',
  styleUrls: ['./check-mail.component.scss'],
})
export class CheckMailComponent implements OnInit {
  hide: boolean = true;

  @Input() email: string = 'me@email.com';

  constructor() {}

  ngOnInit(): void {}
}
