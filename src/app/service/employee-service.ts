import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private listEmployees:  Employee[];
  apiRoot: string = 'http://localhost:3000/employees';

  constructor(private httpClient: HttpClient) {
    this.listEmployees = [];
   }


  getEmployees(): Employee[]{
    const promise = this.httpClient.get(this.apiRoot).toPromise();
    promise.then(x => {
        this.listEmployees = x as Employee[];
    });
    return this.listEmployees;
  }
}
