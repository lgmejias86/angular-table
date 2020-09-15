import { Component } from '@angular/core';
import { EmployeeService } from './service/employee-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'table-app';

  constructor(private employeeService: EmployeeService){
    this.employeeService.getEmployees();
  }
}
