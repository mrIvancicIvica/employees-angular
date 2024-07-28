import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl = 'https://api.test.ulaznice.hr/paganini/api/job-interview/employees';
  constructor(private http: HttpClient) {}



  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
