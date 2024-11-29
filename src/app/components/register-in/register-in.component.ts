import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Route } from '@angular/router';
import { AuthService } from '../../../services/Auth.service';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { User } from '../../../models/models';
import { Router } from '@angular/router';
import { finalize, catchError, EMPTY } from 'rxjs';




@Component({
  selector: 'app-register-in',
  templateUrl: './register-in.component.html',
  styleUrl: './register-in.component.css'
})
export class RegisterInComponent implements OnInit {

  testregister: string = '';
  userBool: boolean = false;
  emailSent: boolean;
  errorMessage: any;

  ngOnInit(): void {

  }

  ToggleLogin() {
    this.userBool = !this.userBool;
    return this.userBool;
  }

  constructor(private authService: AuthService, private router: Router) {

  }

  isLoading: boolean;









  loginFunction(loginForm: NgForm) {
    if (loginForm.valid) {
      this.authService.login(
        loginForm.value.email,
        loginForm.value.password
      ).subscribe({
        next: (user) => {
          // Successful login
          this.router.navigate(['/Landing/Home']); // Correct usage
        },
        error: (error) => {
          // Handle login errors
          switch (error.code) {
            case 'auth/user-not-found':
              this.errorMessage = 'No account found with this email.';
              break;
            case 'auth/wrong-password':
              this.errorMessage = 'Incorrect password.';
              break;
            case 'auth/too-many-requests':
              this.errorMessage = 'Too many login attempts. Please try again later.';
              break;
            default:
              this.errorMessage = 'Login failed. Please try again.';
          }
          console.error('Login error:', error);
        }
      });
    }



  }




  registerFunction(register: NgForm) {

  }





} 
