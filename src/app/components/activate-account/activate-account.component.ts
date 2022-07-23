import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.scss'],
})
export class ActivateAccountComponent implements OnInit {
  params: any;
  message: any;

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Get Route Id
    this.activateRoute.paramMap.subscribe((params: any) => {
      this.params = params.params;
    });

    this.verifyEmail();
  }

  // Verify Email
  verifyEmail() {
    this.authService.confirmEmail(this.params).subscribe(
      (res: any) => {
        console.log(res);

        // Route User to Login
        this.router.navigate(['/login']);
      },
      (error: any) => {
        console.log(error.error.message);
        this.message = error.error.message;
      }
    );
  }
}
