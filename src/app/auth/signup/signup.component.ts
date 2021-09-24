import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PasswordChecking } from '../Validators/password-checking';
import { UniqueUsername } from '../Validators/unique-username';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  authForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-z0-9]+$/)
    ],
      [this.uniqueUsername.validate]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
    ]),
    passwordConfirmation: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
    ])
  }, { validators: [this.passwordChecking.validate] })
  constructor(
    private passwordChecking: PasswordChecking,
    private uniqueUsername: UniqueUsername,
    private authService: AuthService,
    private router:Router
  ) { }

  ngOnInit(): void {
  }
  onSubmit() {
    if (this.authForm.invalid) {
      return;
    }
    this.authService.signup(this.authForm.value)
      .subscribe({
        next: response => {
          // navigate some other route
          this.router.navigateByUrl('/inbox')
        },
        error: (err) => {
          if (!err.status) {
            this.authForm.setErrors({ noConnection: true })
          } else {
            this.authForm.setErrors({ unkownError: true })
          }
        }

      });
  }
}
