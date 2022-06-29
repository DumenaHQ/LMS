import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CoursesService } from 'src/app/services/courses.service';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.scss']
})
export class CreateCourseComponent implements OnInit {

  selectedFile: File;
  previewImage: any;
  showPreviewImage: boolean = false;
  // @Output() showHeader: EventEmitter<any> = new EventEmitter();

  loading: boolean = false;
  returnUrl = '';
  errorMessage: string = "";
  showError: boolean = false;

  constructor(private coursesService: CoursesService) { }

  ngOnInit(): void {
    this.coursesService.getAllCourses().subscribe((res: any) => {
      console.log(res)
    })

  }

  // "title": "Basic Programming",
  //   "description": "This course is about Programming",
  //   "tags": ["developer", "tech"],
  //   "difficulty_level": "Beginner",
  //   "course_quadrant": "Developer"

  // Sign Up
  addCourse() {
    // Set loading to true
    this.loading = true

    let payroll = {
      title: "Basic Programming",
      description: "This course is about Programming",
      tags: ["developer", "tech"],
      difficulty_level: "Beginner",
      course_quadrant: "Developer",
    }

    console.log(payroll)
    // Send users data
    this.coursesService.addCourse(payroll).subscribe((res: any) => {
      console.log(res)

      // Show error message
      this.errorMessage = res.message
      this.showError = true

      // Set loading to false
      this.loading = false

    }, ((error: any) => {
      console.log(error)
      // Show error message
      // this.errorMessage = error.error.error.errors[0].message
      this.errorMessage = error.error.message
      this.showError = true
      // Set loading to false
      this.loading = false

      // Set Timeout
      // setTimeout(() => {
      //   this.showError = false
      // }, 3000);


    }))
  }

  // Upload File
  uploadFile(event: any) {
    // for (let index = 0; index < event.length; index++) {
    //   const element = event[index];
    //   this.files.push(element.name)
    // }

    // Preview File Selected
    this.selectedFile = event[0]

    if (this.selectedFile) {
      let reader = new FileReader();
      reader.readAsDataURL(this.selectedFile)
      reader.onload = (e: any) => {
        this.previewImage = e.target.result
        if (this.previewImage !== "") {
          this.showPreviewImage = true
        } else {
          this.showPreviewImage = false
        }
      }
    }
  }

}
