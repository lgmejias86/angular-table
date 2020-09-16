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

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'select'];
  //dataSource: Employee[] = [];
  dataSource = ELEMENT_DATA;

  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  myselectedFoods = ['Extra cheese', 'Mushroom'];

  toppings: FormControl = new FormControl(this.myselectedFoods);

  $unSubscribeAll = new Subject();

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    console.log('Employee', this.employeeService.getEmployees());
    this.employeeService.getEmployees().pipe
    (takeUntil(this.$unSubscribeAll)).subscribe(data => {
      console.log(data);
      //this.dataSource = data;
   });

  }

  ngOnDestroy(): void {
    this.$unSubscribeAll.next();
    this.$unSubscribeAll.complete();
  }

}
