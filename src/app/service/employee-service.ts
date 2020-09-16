import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private listEmployees: Employee[];
  apiRoot: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) {
    this.listEmployees = [];
   }


   getEmployees(): Observable< Employee[]>{

    return this.httpClient.get(this.apiRoot).pipe(
      map((response: any) => {
        return response;
      })
    );
  }
}
