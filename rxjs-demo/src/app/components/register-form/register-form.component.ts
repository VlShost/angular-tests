import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgClass } from '@angular/common';

import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user';

import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AutoFocusModule } from 'primeng/autofocus';

@Component({
  selector: 'app-register-form',
  imports: [
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    AutoFocusModule,
    NgClass,
    ButtonModule,
  ],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css',
})
export class RegisterFormComponent {
  constructor(
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  registerForm = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      passwordConfirm: new FormControl('', [Validators.required]),
    },
    {
      validators: this.passwordMatchValidator,
    }
  );

  passwordMatchValidator(control: AbstractControl) {
    return control.get('password')?.value === control.get('passwordConfirm')?.value
      ? null
      : { mismatch: true };
  }

  handleSubmit() {
    const userData = { ...this.registerForm.value };
    delete userData.passwordConfirm;

    this.authService.registerNewUser(userData as User).subscribe({
      next: (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Register successful',
          life: 3000,
        });
        this.handleToLogin();
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Register failed',
          life: 3000,
        });
      },
    });
  }

  handleToLogin() {
    this.router.navigate(['/login']);
  }

  get email() {
    return this.registerForm.controls['email'];
  }
  get password() {
    return this.registerForm.controls['password'];
  }
  get passwordConfirm() {
    return this.registerForm.controls['passwordConfirm'];
  }
}
