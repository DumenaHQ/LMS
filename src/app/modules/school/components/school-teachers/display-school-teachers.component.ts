import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-display-school-teachers',
  templateUrl: './display-school-teachers.component.html',
  styleUrls: ['./display-school-teachers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisplaySchoolTeachersComponent { }
