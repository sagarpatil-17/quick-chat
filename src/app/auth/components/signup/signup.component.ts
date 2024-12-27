import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-signup',
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  public isLoading: boolean = false;

  constructor(private router: Router, private _authService: AuthService) { }

  ngOnInit(): void {
  }

  registerForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  })

  public onSignUp(isChecked) {
    const registerForm = this.registerForm.value;
    const userInfo = { username: registerForm.username, email: registerForm.email, password: registerForm.password };

    if (this.registerForm.valid && isChecked == true) {
      this.isLoading = true;
      this._authService.signup(userInfo).subscribe(res => {
        this.isLoading = false;
        Swal.fire({
          icon: 'success',
          title: 'Sign up Successful!',
        }).then((result) => {
          this.registerForm.reset();
          if (result.isConfirmed) {
            this.router.navigate(['/sign-in']);
          }
        });
      }, (err) => {
        this.isLoading = false;
        Swal.fire({
          icon: 'error',
          title: 'Sign up Failed',
          confirmButtonText: 'Try Again',
          text: err.error?.message,
        });
      })
    } else
      Swal.fire({
        icon: "info",
        text: "You must fill in all the fields.",
      });
  }
}
