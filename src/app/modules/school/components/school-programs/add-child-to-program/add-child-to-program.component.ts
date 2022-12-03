import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { ProgramsService } from 'src/app/services/programs.service';
import { SchoolService } from 'src/app/services/school.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-add-child-to-program',
  templateUrl: './add-child-to-program.component.html',
  styleUrls: ['./add-child-to-program.component.scss'],
})
export class AddChildToProgramComponent implements OnInit {
  @Output() addChildToProgramModal: EventEmitter<any> = new EventEmitter();
  isAlert: boolean = false;
  alertMessage: string;
  alertColor: string;
  @Input() programId: string;

  loading: boolean = false;
  errorMessage: string = '';
  showError: boolean = false;
  user: any;
  selectedAVatarUrl: string = '';
  messageval: string;
  billingId: string = 'single';
  selectedFileName: any;
  isFormSubmitted: boolean = false;
  file: File;
  arrayBuffer: any;
  learnersList: any;
  students: any;
  dataLoading: boolean = true;
  studentName: any;
  selectedLearnerss: any[] = [];
  

  constructor(
    private authService: AuthService,
    private programsService: ProgramsService,
    private schoolService: SchoolService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    // Get User data from localstorage
    let userData = this.authService.getUser();
    this.user = userData.user;

    // Get school learners from localstorage
    this.schoolService.getSchoolLearners(this.user.id).subscribe({
      next: (res: any) => {
        this.students = res.data.students;
        // console.log(this.students);
      },
      error: (e) => console.error(e),
      complete: () => {
        this.dataLoading = false;
      },
    });

    // Get download learners list 
    // this.schoolService.getDownloadLearnersList(this.user.id)
    // .subscribe({
    //   next: (res: any) => {
    //     let result = res;
    //     console.log(result);
    //   },
    //   error: (e) => console.error(e),,
    // });
  }

  // Tab change
  tabChange(ids: any) {
    this.billingId = ids;
  }

  // Add Learner(s)
  addLearners() {
    // Set loading to true
    this.loading = true;

    let payload = {
      learners: this.selectedLearnerss,
    };
    console.log(payload);


    this.programsService
      .addLearnerToProgram(payload, this.programId)
      .subscribe({
        next: (res: any) => {
          console.log(res);

          if (res.status === true) {
            this.showAlertPopup(res.message, 'success');
            // close modal
            this.closeAddChildToProgramModal()
          }
        },
        error: (e) => {
          console.error(e)
          this.showAlertPopup(e.error.message, 'error');

          this.loading = false
        },
        // complete: () => {
        //   this.dataLoading = false;
        // },
      });
  }

  // Batch Add Learner(s)
  batchAddLearners() {
    // Set loading to true
    this.loading = true;

    if (this.learnersList === undefined) {
      this.loading = false;

      return;
    }

    // Payload
    let payload = {
      learners: this.learnersList,
    };

    console.log(payload);

    // this.programsService
    //   .addLearnerToProgram(payload, this.programId)
    //   .subscribe({
    //     next: (res: any) => {
    //       console.log(res);

    //       if (res.status === true) {
    //         this.showAlertPopup(res.message);
    //       }
    //     },
    //     error: (e) => console.error(e),
    //     // complete: () => {
    //     //   this.dataLoading = false;
    //     // },
    //   });
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

      let newLearners = learners.shift();
      this.learnersList = learners.map((learner: any) => ({
        username: learner.__EMPTY,
        // parent_email: learner.__EMPTY_1,
        // grade: learner.__EMPTY_2,
      }));
    };
    fileReader.readAsArrayBuffer(this.file);
  }

  // Search students
  search() {
    if (this.studentName != "") {
      this.students = this.students.filter((res: any) => {
        return res.fullname.toLocaleLowerCase().match(this.studentName.toLocaleLowerCase());
      });
    } else if (this.studentName == "") {
      this.ngOnInit()
    }
  }

  // Select students
  selectStudent(event: any, student: any) {
    // selected.selected = true;

    // If doesn't exist add new student
    if(event.target.checked === false) {
      this.selectedLearnerss.forEach((element: any, index: any) => {
          if(element.username === student.username) {
            this.selectedLearnerss.splice(index, 1)
          }
          return this.selectedLearnerss
        });
      }
      else {
        this.selectedLearnerss.push({username: student.username});
      }

      console.log(this.selectedLearnerss);
      
  }

  // Close Add Modal
  closeAddChildToProgramModal() {
    this.addChildToProgramModal.emit();
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
