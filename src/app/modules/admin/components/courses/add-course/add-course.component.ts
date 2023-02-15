import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss']
})
export class AddCourseComponent implements OnInit {

  selectedFile: File;
  previewImage: any;
  showPreviewImage: boolean = false;
  // @Output() showHeader: EventEmitter<any> = new EventEmitter();

  loading: boolean = false;
  isAlert: boolean = false;
  alertMessage: string;
  alertColor: string;
  courseForm: any = FormGroup;
  isTags: any;
  isTagsList: boolean = false
  tagsList: any[] = [];

  constructor(
    private coursesService: CoursesService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.coursesService.getAllCourses().subscribe((res: any) => {
      console.log(res);
    });

    this.courseForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      tags: ['', Validators.required],
      difficulty_level: ['', Validators.required],
      course_quadrant: ['', Validators.required],
    });
  }

  // Add tags
  addTag() {
    // Show added tagsory(s)
    if (this.courseForm.value.tags !== '') {
      // Show added email(s)
      this.isTagsList = true;
      this.tagsList.push(this.courseForm.value.tags);
    }
    // Clear input field
    this.courseForm.get('tags').setValue('');
    
  }
  // Remove tagsory
  removeTag(index: any) {
    this.tagsList.splice(index, 1);
    // this.ngOnInit()
  }

  // Add Course
  addCourse() {
    // Set loading to true
    this.loading = true;

    let payload = {
      title: this.courseForm.value.title,
      description: this.courseForm.value.description,
      tags: this.tagsList,
      difficulty_level: this.courseForm.value.difficulty_level,
      course_quadrant: this.courseForm.value.course_quadrant,
    };

    // Send users data
    this.coursesService.addCourse(this.courseForm.value).subscribe(
        (res: any) => {
        console.log(res);
        
        this.showAlertPopup(res.message, 'success')

        setTimeout(() => {
          this.router.navigate([`admin/courses/create-course/${res.data.course.id}/modules`])
        }, 3000);

        // Set loading to false
        this.loading = false;
      },
      (error: any) => {
        console.log(error);
        // Show error message
        // this.errorMessage = error.error.error.errors[0].message
        this.showAlertPopup(error.error.message, 'error')
        // Set loading to false
        this.loading = false;

        // Set Timeout
        // setTimeout(() => {
        //   this.showError = false
        // }, 3000);
      }
    );
  }

  // Upload File
  uploadFile(event: any) {
    // for (let index = 0; index < event.length; index++) {
    //   const element = event[index];
    //   this.files.push(element.name)
    // }

    // Preview File Selected
    this.selectedFile = event[0];

    if (this.selectedFile) {
      let reader = new FileReader();
      reader.readAsDataURL(this.selectedFile);
      reader.onload = (e: any) => {
        this.previewImage = e.target.result;
        if (this.previewImage !== '') {
          this.showPreviewImage = true;
        } else {
          this.showPreviewImage = false;
        }
      };
    }
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
