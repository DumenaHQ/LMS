import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProgramsService } from 'src/app/services/programs.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-add-child-to-program',
  templateUrl: './add-child-to-program.component.html',
  styleUrls: ['./add-child-to-program.component.scss'],
})
export class AddChildToProgramComponent implements OnInit {
  @Output() addChildToProgramModal: EventEmitter<any> = new EventEmitter();
  @Output() isAlert: EventEmitter<any> = new EventEmitter();
  @Output() alertMessaage = new EventEmitter<string>();
  @Input() programId: string;

  loading: boolean = false;
  errorMessage: string = '';
  showError: boolean = false;
  user: any;
  selectedAVatarUrl: string = '';
  messageval: string;
  billingId: string = 'single';
  selectedFileName: any;
  userForm: any = FormGroup;
  isFormSubmitted: boolean = false;
  file: File;
  arrayBuffer: any;
  learnersList: any;

  constructor(
    private authService: AuthService,
    private programsService: ProgramsService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    // Get User data from localstorage
    let userData = this.authService.getUser();
    this.user = userData.user;

    this.userForm = this.formBuilder.group({
      fullname: ['', Validators.required],
      parent_email: ['', [Validators.required, Validators.email]],
      grade: ['', Validators.required],
    });
  }

  // Tab change
  tabChange(ids: any) {
    this.billingId = ids;
  }

  // Add Learner(s)
  addLearner() {
    // Set loading to true
    this.loading = true;

    // Set submitted to true
    this.isFormSubmitted = true;

    // If Form is invalid
    if (this.userForm.invalid) {
      this.loading = false;

      return;
    }

    let payload = {
      learners: [
        {
          id: '6298dc927aa3eebca67f26ff',
          name: 'Jeffery Bassey',
        },
      ],
    };
    console.log(this.programId);

    this.programsService
      .addLearnerToProgram(payload, this.programId)
      .subscribe({
        next: (res: any) => {
          console.log(res);

          if (res.status === true) {
            this.showAlertPopup(res.message);
          }
        },
        error: (e) => console.error(e),
        // complete: () => {
        //   this.dataLoading = false;
        // },
      });
  }

  // Batch Add Learner(s)
  batchAddLearners() {
    // Set loading to true
    this.loading = true;

    // Payload
    let payload = {
      learners: this.learnersList,
    };

    console.log(payload);

    this.programsService
      .addLearnerToProgram(payload, this.programId)
      .subscribe({
        next: (res: any) => {
          console.log(res);

          if (res.status === true) {
            this.showAlertPopup(res.message);
          }
        },
        error: (e) => console.error(e),
        // complete: () => {
        //   this.dataLoading = false;
        // },
      });
  }

  // Show alert popup
  showAlertPopup(message: string) {
    this.messageval = message;
    // Set alert message
    this.alertMessaage.emit(this.messageval);

    this.isAlert.emit();
  }

  // Upload File
  uploadFile(event: any) {
    this.file = event.target.files[0];
    // Set file name
    this.selectedFileName = this.file.name;

    // Extract emails from xlxs sheet
    let fileReader = new FileReader();
    fileReader.onload = (e: any) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i)
        arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join('');
      var workbook = XLSX.read(bstr, { type: 'binary' });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      let learners = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      console.log(learners);

      let newLearners = learners.shift();
      this.learnersList = learners.map((learner: any) => ({
        fullname: learner.__EMPTY,
        parent_email: learner.__EMPTY_1,
        grade: learner.__EMPTY_2,
      }));
    };
    fileReader.readAsArrayBuffer(this.file);
  }

  // Close Add Modal
  closeAddChildToProgramModal() {
    this.addChildToProgramModal.emit();
  }
}
