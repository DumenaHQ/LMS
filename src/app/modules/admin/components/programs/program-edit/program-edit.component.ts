import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProgramsService } from 'src/app/services/programs.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-program-edit',
  templateUrl: './program-edit.component.html',
  styleUrls: ['./program-edit.component.scss']
})
export class ProgramEditComponent implements OnInit {

  program: any;
  currentProgramId: any;
  alertMessage: string = '';
  alertColor: string = '';
  isAlert: boolean = false;
  loading: boolean = false;
 
  constructor(
    private programsService: ProgramsService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router

  ) { }

  // Program form
  programForm = this.formBuilder.group({
    name: [''],
    description: [''],
    // thumbnail: ['', [Validators.required]],
    // header_photo: ['', [Validators.required]],
  });

  ngOnInit(): void {
    // Get Current Program
    this.currentProgramId = this.activatedRoute.snapshot.params;

    // Get programs
    this.programsService
      .getProgramsById(this.currentProgramId.programId)
      .subscribe({
        next: (res: any) => {
          this.program = res.data.program;
          console.log(this.program);
          this.initForm();
          
        },
        error: (e) => console.error(e),
        // complete: () => {
        //   this.dataLoading = false;
        // },
      });

  }

  // Initialize form
  initForm() {
    // Program form
    this.programForm = this.formBuilder.group({
      name: [this.program.name],
      description: [this.program.description],
      // thumbnail: ['', [Validators.required]],
      // header_photo: ['', [Validators.required]],
    });
  }

  editProgram() {
    // Set loading to true
    this.loading = true;

    let payload = {
      name: this.programForm.value.name,
      description: this.programForm.value.description
    }
      
    // Send users data
    this.programsService.editProgram(payload, this.currentProgramId.programId).subscribe(
      (res: any) => {
        console.log(res);

        // Show alert
        if (res.status === true) {
          this.alertMessage = res.message;
          this.showAlertPopup(res.message, 'success');
          // Set Timeout
          setTimeout(() => {
            this.router.navigate([`/admin/programs/${this.currentProgramId.programId}/view-program`]);
          }, 3000);
        }

        // Set loading to false
        this.loading = false;
      },
      (error: any) => {
        console.log(error);
        this.showAlertPopup(error.error.message, 'error');

        // Set loading to false
        this.loading = false;

      }
    );
  }


  // Show alert
  showAlertPopup(message: string, color: string) {
    // Set message
    this.alertMessage = message;
    // Set color
    this.alertColor = color;
    // Show Alert
    this.isAlert = true;
    // Hide Alert
    setTimeout(() => {
      this.isAlert = false;
    }, 3000);
  }

}
