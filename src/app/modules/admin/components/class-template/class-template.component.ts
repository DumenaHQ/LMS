import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-class-template',
  templateUrl: './class-template.component.html',
  styleUrls: ['./class-template.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassTemplateComponent implements OnInit {

  ngOnInit(): void { }

}
