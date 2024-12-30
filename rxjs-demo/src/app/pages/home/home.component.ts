import { Component } from '@angular/core';
import { CreditFormComponent } from '../../components/credit-form/credit-form.component';
import { Router } from '@angular/router';

import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home',
  imports: [CreditFormComponent, ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  constructor(private router: Router) {}

  handleLogOut() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
