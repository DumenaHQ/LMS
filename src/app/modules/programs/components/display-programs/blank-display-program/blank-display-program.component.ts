import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-blank-display-program',
  templateUrl: './blank-display-program.component.html',
  styleUrls: ['./blank-display-program.component.scss']
})
export class BlankDisplayProgramComponent implements OnInit {

  @Input() user: any;
  
  constructor() { }

  ngOnInit(): void {
  }

}
