import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProgramsService } from 'src/app/services/programs.service';

@Component({
  selector: 'app-programs-grid',
  templateUrl: './programs-grid.component.html',
  styleUrls: ['./programs-grid.component.scss'],
})
export class ProgramsGridComponent implements OnInit {
  @Input() programs: any;
  @Input() days: any;
  programName: any;

  deleteModal: boolean = false;
  deleteUrl: string;
  deleteRoutePath: string;

  constructor(
    private programsService: ProgramsService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  // Display program
  displayProgram(programId: string) {
    this.router.navigate([`/admin/programs/${programId}/view-program`]);
  }

  // Open Confirm Delete Modal
  openDeleteModal(program: any) {
    this.programName = program.name
    
    this.deleteModal = true;

    this.deleteUrl = `programs/${program.id}`
    this.deleteRoutePath = ''
  }

  // Close Confirm Delete Modal
  closeDeleteModal() {
    this.deleteModal = false;
  }

  // Delete program
  deleteProgram(program: any) {
    // Get programs
    this.programsService.deleteProgram(program.id).subscribe({
      next: (res: any) => {
        console.log(res);
        this.programs;
      },
      error: (e) => console.error(e),
      // complete: () => {
      //   this.dataLoading = false;
      // },
    });
  }
}
