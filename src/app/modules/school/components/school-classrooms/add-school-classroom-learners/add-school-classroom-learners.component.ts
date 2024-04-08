import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ClassroomService } from 'src/app/services/classroom.service';
import { SchoolService } from 'src/app/services/school.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-add-school-classroom-learners',
  templateUrl: './add-school-classroom-learners.component.html',
  styleUrls: ['./add-school-classroom-learners.component.scss']
})
export class AddSchoolClassroomLearnersComponent implements OnInit {

  @Output() addLearnerToClassroomModal: EventEmitter<any> = new EventEmitter();
  @Input() classroomId: string;
  isAlert: boolean = false;
  alertMessage: string;
  alertColor: string;

  loading: boolean = false;
  errorMessage: string = '';
  showError: boolean = false;
  user: any;
  messageval: string;
  billingId: string = 'single';
  selectedFileName: any;
  file: File;
  arrayBuffer: any;
  learnersList: any;
  schoolLearners: any;
  parentLearners: any;
  dataLoading: boolean = false;
  studentName: any;
  selectedLearners: any[] = [];

  grades: any = [];
  

  constructor(
    private authService: AuthService,
    private classroomService: ClassroomService,
    private schoolService: SchoolService,
  ) {}

  ngOnInit(): void {
    // Get User data from localstorage
    let userData = this.authService.getUser();
    this.user = userData.user;

    this.getAllStudents(undefined);
  }

  // Get all students
  getAllStudents(event: any) {
    this.dataLoading = true;
    let grade = event?.target?.value === '' ? undefined : event?.target?.value;
    const school_id = this.user.id;
    this.schoolService.getSchoolLearners(school_id, grade).subscribe({
      next: (res: any) => {
        this.schoolLearners = res.data.students;     
        if(this.grades.length === 0) {
          this.grades = res.data.grades.map((grade: any) => ({ 
            id: grade, name: grade 
          }));
        }
      },
      error: (e) => console.error(e),
      complete: () => {
        this.dataLoading = false;
      }
    });
  }

  // Tab change
  tabChange(ids: any) {
    this.billingId = ids;
  }

  // Add learners to Classroom (select and single enrollment)
  addLearnersToClassroom() {
    // Set loading to true
    this.loading = true;

    let payload = {
      learners: this.selectedLearners,
    };

    this.classroomService
      .addLearnerToClassroom(payload, this.classroomId)
      .subscribe({
        next: (res: any) => {
          console.log(res);

          if (res.status === true) {
            this.showAlertPopup(res.message, 'success');
            // close modal
            setTimeout(() => {
              this.closeAddLearnerToClassroomModal()

              window.location.reload()
            }, 3000);
          }
        },
        error: (e) => {
          console.error(e)
          this.showAlertPopup(e.error.message, 'error');

          this.loading = false
        },
      });
  }

  // Batch Add Learner(s)
  batchAddLearnersToClassroom() {
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

    this.classroomService
      .addLearnerToClassroom(payload, this.classroomId)
      .subscribe({
        next: (res: any) => {
          console.log(res);

          this.showAlertPopup(res.message, 'success');
          // close modal
          setTimeout(() => {
            this.closeAddLearnerToClassroomModal();

            window.location.reload();
          }, 3000);
        },
        error: (e) => console.error(e),
        // complete: () => {
        //   this.dataLoading = false;
        // },
      });
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
      
      this.learnersList = learners.map((learner: any) => ({
        name: learner['Fullname'],
        username: learner['Username'],
      }));
      
    };
    fileReader.readAsArrayBuffer(this.file);
  }

  // Search students
  search() {
    if (this.studentName != "") {
      this.schoolLearners = this.schoolLearners.filter((res: any) => {
        return res.fullname.toLocaleLowerCase().match(this.studentName.toLocaleLowerCase());
      });
    } else if (this.studentName == "") {
      this.ngOnInit();
    }
  }

  // Select students (School)
  selectStudent(event: any, student: any) {
    // selected.selected = true;

    // If doesn't exist add new student
    if(event.target.checked === false) {
      this.selectedLearners.forEach((element: any, index: any) => {
          if(element.username === student.username) {
            this.selectedLearners.splice(index, 1)
          }
          return this.selectedLearners
        });
      }
      else {
        this.selectedLearners.push({username: student.username, user_id: student.id});
      }
      
  }

  // Close Add Modal
  closeAddLearnerToClassroomModal() {
    this.addLearnerToClassroomModal.emit();
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
