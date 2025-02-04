import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';

import { DataService } from '../services/data.service';
import { User } from '../models/user';

@Component({
  selector: 'app-table1',
  imports: [TableModule],
  templateUrl: './table1.component.html',
  styleUrl: './table1.component.scss',
})
export class Table1Component {
  data: User[] = [];

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getAllUsers().subscribe((users) => {
      this.data = users;
    });
  }
}
