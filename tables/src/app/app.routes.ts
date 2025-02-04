import { Routes } from '@angular/router';
import { Table1Component } from './table1/table1.component';

export const routes: Routes = [
  {
    path: 'table1',
    component: Table1Component,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
