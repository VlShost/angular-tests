import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgClass } from '@angular/common';

import { AuthService } from '../../services/auth.service';

import { MessageService } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { AutoFocusModule } from 'primeng/autofocus';

@Component({
  selector: 'app-login-form',
  imports: [
    ReactiveFormsModule,
    CardModule,
    InputTextModule,
    AutoFocusModule,
    NgClass,
    ButtonModule,
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css',
})
export class LoginFormComponent {
  constructor(
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService
  ) {}

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  handleSubmit() {
    const { email, password } = this.loginForm.value;

    this.authService.getUserByEmail(email as string).subscribe({
      next: (response) => {
        if (response.length > 0 && response[0].password === password) {
          const user = {
            id: response[0].id,
            email: response[0].email,
          };
          localStorage.setItem('user', JSON.stringify(user));
          this.router.navigate(['home']);
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Email or Password is invalid',
            life: 3000,
          });
        }
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Login failed',
          life: 3000,
        });
      },
    });
  }

  handleToRegister() {
    this.router.navigate(['/register']);
  }

  get email() {
    return this.loginForm.controls['email'];
  }
  get password() {
    return this.loginForm.controls['password'];
  }
}
