import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-signin',
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss'
})
export class SigninComponent {
  public isLoading: boolean = false;

  constructor(private router: Router, private _authService: AuthService) { }

  ngOnInit(): void {
  }

  signinForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  })

  get username() { return this.signinForm.get('username'); }
  get password() { return this.signinForm.get('password'); }

  public onSignin(isChecked) {
    const userInfo = { username: this.username.value, password: this.password.value };

    if (this.signinForm.valid && isChecked == true && !this.isLoading) {
      this.isLoading = true;
      this._authService.signin(userInfo).subscribe(res => {
        this.isLoading = false;
        localStorage.setItem('token', res['auth_token']);
        localStorage.setItem('user_info', JSON.stringify(res['user_info']));
        Swal.fire({
          icon: 'success',
          title: 'Sign in Successful',
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/home']);
          }
        });
      }, (err) => {
        this.isLoading = false;
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
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
