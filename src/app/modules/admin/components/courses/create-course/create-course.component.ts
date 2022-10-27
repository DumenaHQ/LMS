import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss'],
})
export class CreateCourseComponent implements OnInit {
  selectedFile: File;
  previewImage: any;
  showPreviewImage: boolean = false;
  // @Output() showHeader: EventEmitter<any> = new EventEmitter();

  loading: boolean = false;
  errorMessage: string = '';
  showError: boolean = false;

  constructor(
    private coursesService: CoursesService,
    private formBuilder: FormBuilder
  ) {}

  // Course Form
  courseForm = this.formBuilder.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    tags: [[''], Validators.required],
    difficulty_level: ['', Validators.required],
    course_quadrant: ['', Validators.required],
  });

  ngOnInit(): void {
    this.coursesService.getAllCourses().subscribe((res: any) => {
      console.log(res);
    });

    this.courseForm = this.formBuilder.group({
      title: ['Testing', Validators.required],
      description: ['THis is testing', Validators.required],
      tags: [['developer', 'tech'], Validators.required],
      difficulty_level: ['Beginner', Validators.required],
      course_quadrant: ['Developer', Validators.required],
    });
  }

  // Sign Up
  addCourse() {
    // Set loading to true
    this.loading = true;

    let payroll = {
      title: 'Basic JavaScript',
      description: 'This course is about JavaScript Programming Language',
      tags: ['developer', 'tech', 'coding'],
      difficulty_level: 'Beginner',
      course_quadrant: 'Developer',
    };

    console.log(this.courseForm.value);
    // Send users data
    this.coursesService.addCourse(this.courseForm.value).subscribe(
      (res: any) => {
        console.log(res);

        // Show error message
        this.errorMessage = res.message;
        this.showError = true;

        // Set loading to false
        this.loading = false;
      },
      (error: any) => {
        console.log(error);
        // Show error message
        // this.errorMessage = error.error.error.errors[0].message
        this.errorMessage = error.error.message;
        this.showError = true;
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
}
