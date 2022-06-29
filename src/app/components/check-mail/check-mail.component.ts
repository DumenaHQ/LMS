import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-check-mail',
  templateUrl: './check-mail.component.html',
  styleUrls: ['./check-mail.component.scss']
})
export class CheckMailComponent implements OnInit {

  @Output() pageId = new EventEmitter<string>();

  hide: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  // Close Add Modal
  showSect(value: string) {
    this.pageId.emit(value);
  }

}
