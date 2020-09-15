import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private listEmployees: Employee[];
  apiRoot: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) {
    this.listEmployees = [];
   }


   getEmployees(): Employee[]{
    const promise = this.httpClient.get(this.apiRoot).toPromise();
    promise.then(emp => {
         this.listEmployees = emp as Employee[];
         return  this.listEmployees;
    });
    return null;
  }
}
