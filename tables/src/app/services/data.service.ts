import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private apiUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`).pipe(
      map((users) =>
        users.map((user) => ({
          id: user?.id?.toString() || 'N/A',
          name: user?.name || 'NO DATA',
          username: user?.username || 'NO DATA',
          email: user?.email || 'NO DATA',
          city: user?.address?.city || 'NO DATA',
          company: user?.company?.name || 'NO DATA',
        }))
      ),
      catchError((error) => {
        console.error('Error fetching users:', error);
        return of([]);
      })
    );
  }
}
