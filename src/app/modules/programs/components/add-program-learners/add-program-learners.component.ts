import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AlertType, AppAlertService } from 'src/app/services/app-alerts/app-alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { ProgramsService } from 'src/app/services/programs.service';
import { SchoolService } from 'src/app/services/school.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-add-program-learners',
  templateUrl: './add-program-learners.component.html',
  styleUrls: ['./add-program-learners.component.scss']
})
export class AddProgramLearnersComponent implements OnInit {

  @Input() programId: string;
  @Output() addLearnerToProgramModal: EventEmitter<any> = new EventEmitter();
  @Output() getProgram: EventEmitter<any> = new EventEmitter();
  loading: boolean = false;
  user: any;
  billingId: string = 'single';
  selectedFileName: any;
  file: File;
  arrayBuffer: any;
  learners: any;
  dataLoading: boolean = false;
  studentName: any;
  uploadedLearners: any[] = [];
  selectedLearners: any[] = [];
  grades: any = [];
  filterValues = {
    search: '',
    grade: '',
  };

  constructor(
    private authService: AuthService,
    private programsService: ProgramsService,
    private schoolService: SchoolService,
    private appAlertService: AppAlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user= this.authService.getUser().user;
    this.getAllStudents();
  }

  // Get all students
  getAllStudents() {
    this.dataLoading = true;
    const school_id = this.user.id;
    const params = {
      grade: this.filterValues.grade || undefined,
      search: this.filterValues.search || undefined
    };
    if(this.user.role === 'school') {
      this.schoolService.getSchoolLearners(school_id, params).subscribe({
        next: (res: any) => {
          this.learners = res.data.students;
          if(this.grades.length === 0) {
            this.grades = res.data.grades.map((grade: any) => ({ 
              id: grade, name: grade 
            }));
          }
        },
        error: (e) => console.error(e),
        complete: () => {
          this.dataLoading = false;
        },
      });
    } else {
      // Get parent learners from localstorage
      this.authService.getParentChildren(this.user.id).subscribe({
        next: (res: any) => {
          this.learners = res.data.learners;
          console.log(this.learners);
        },
        error: (e) => console.error(e),
        complete: () => {
          this.dataLoading = false;
        },
      });
    }
  }

  handleFilterValues() {
    this.getAllStudents();   
  }

  // Tab change
  tabChange(ids: any) {
    this.billingId = ids;
  }

  addLearnersToProgram(uploadType: string) {
    this.loading = true;

    let payload = {
      learners: uploadType === 'selected' ? this.selectedLearners : this.uploadedLearners,
    };
    
    this.programsService
      .subscribeLearnerToProgram(payload, this.programId)
      .subscribe({
        next: (res: any) => {
          if (res.status === true) {
            this.appAlertService.showAlert(res.message, AlertType.Success);
            this.router.navigate([`/${this.user.role}/payment/cart`]);
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
    selectedData = this.learners.map((item: any) => {
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
        name: learner['Learner Username'],
        user_id: learner['Learner ID'],
      }));
    };
    fileReader.readAsArrayBuffer(this.file);
  }

  // Search students
  search() {
    if (this.studentName != "") {
      this.learners = this.learners.filter((res: any) => {
        return res.fullname.toLocaleLowerCase().match(this.studentName.toLocaleLowerCase());
      });
    } else if (this.studentName == "") {
      this.ngOnInit();
    }
  }

  isLearnerSelected(request: any): boolean {
    return this.selectedLearners.some(selected => selected.user_id === request.id);
  }

  // Select students (School)
  selectLearner(event: any, learner: any) {
    if (event.target.checked) {
      this.selectedLearners.push({
        username: learner.username, 
        user_id: learner.id,
      });
    } else {
      this.selectedLearners = this.selectedLearners.filter(selected => selected.user_id !== learner.id);
    }  
  }

  toggleSelectAllLearner(event: any) {
    if (event.target.checked) {
      this.selectedLearners = [];
      this.learners.map((learner: any) => {
        this.selectedLearners.push({ 
          username: learner.username, 
          user_id: learner.id 
        })
      });
      this.appAlertService.showAlert('All learners selected', AlertType.Warning);
    } else {
      this.selectedLearners = [];
      this.appAlertService.showAlert('All learners removed', AlertType.Warning);
    }
  }

  // Close Add Modal
  closeAddLearnerToProgramModal() {
    this.addLearnerToProgramModal.emit();
  }

}

