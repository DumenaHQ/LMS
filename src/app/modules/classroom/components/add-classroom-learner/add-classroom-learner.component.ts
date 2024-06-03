import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AlertType, AppAlertService } from 'src/app/services/app-alerts/app-alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { ClassroomService } from 'src/app/services/classroom.service';
import { SchoolService } from 'src/app/services/school.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-add-classroom-learner',
  templateUrl: './add-classroom-learner.component.html',
  styleUrls: ['./add-classroom-learner.component.scss']
})
export class AddClassroomLearnerComponent implements OnInit {

  @Input() classroomId: string;
  @Output() addLearnerToClassroomModal: EventEmitter<any> = new EventEmitter();
  @Output() getClassroom: EventEmitter<any> = new EventEmitter();
  loading: boolean = false;
  user: any;
  billingId: string = 'single';
  selectedFileName: any;
  file: File;
  arrayBuffer: any;
  schoolLearners: any;
  dataLoading: boolean = false;
  studentName: any;
  uploadedLearners: any[] = [];
  selectedLearners: any[] = [];
  grades: any = [];

  constructor(
    private authService: AuthService,
    private classroomService: ClassroomService,
    private schoolService: SchoolService,
    private appAlertService: AppAlertService,
  ) {}

  ngOnInit(): void {
    // Get User data from localstorage
    let userData = this.authService.getUser();
    this.user = userData.user;

    this.getAllStudents('');
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

  addLearnersToClassroom(uploadType: string) {
    this.loading = true;

    let payload = {
      learners: uploadType === 'selected' ? this.selectedLearners : this.uploadedLearners,
    };

    this.classroomService
      .addLearnerToClassroom(payload, this.classroomId)
      .subscribe({
        next: (res: any) => {
          if (res.status === true) {
            this.appAlertService.showAlert(res.message, AlertType.Success);
            this.closeAddLearnerToClassroomModal();
            this.getClassroom.emit();
          }
        },
        error: (error) => {
          console.error(error);
          this.appAlertService.showAlert(
            error.error.message
              ? error.error.message
              : error.message
              ? error.error.message || error.error.error.errors[0].message
              : error.message,
            AlertType.Error
          );
          this.loading = false;
        }
      });
  }

  downloadLearnersAsExcel() {
    let selectedData;
    selectedData = this.schoolLearners.map((item: any) => {
      return {
        'Learner Username': item.username,
        'Learner ID': item.id,
      };
    });

    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(selectedData);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // Generate an array containing the Excel file
    const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

    // Convert the array buffer to Blob
    const blob = new Blob([excelBuffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    });

    // Trigger the download
    const downloadLink = document.createElement('a');
    const url = URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = 'learners.xlsx';
    downloadLink.click();
    URL.revokeObjectURL(url);    
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
      
      this.uploadedLearners = learners.map((learner: any) => ({
        username: learner['Learner Username'],
        user_id: learner['Learner ID'],
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

}
