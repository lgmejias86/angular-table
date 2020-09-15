import { Component, OnDestroy, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/service/employee-service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'select'];
  dataSource: Employee[] = [];

  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  myselectedFoods = ['Extra cheese', 'Mushroom'];

  toppings: FormControl = new FormControl(this.myselectedFoods);
  $unSubscribeAll = new Subject();

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    console.log('Employee', this.employeeService.getEmployees());
    this.employeeService.getEmployees().pipe
    (takeUntil(this.$unSubscribeAll)).subscribe(data => {
      this.dataSource = data;
   });

  }

  ngOnDestroy(): void {
    this.$unSubscribeAll.next();
    this.$unSubscribeAll.complete();
  }

}
