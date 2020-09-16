import { Component, OnDestroy, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/service/employee-service';
import {animate, state, style, transition, trigger} from '@angular/animations';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {

  allColumns: string[] = ['id', 'name', 'address', 'country_principality', 'phone_number', 'email', 'business_name',
   'network_id', 'project', 'operational_years', 'duration_association', 'related_business', 'website', 'social'];
  displayedColumns: string[] = this.allColumns.slice (0, 6);
  columnsToDisplay: string[] = this.allColumns.slice( 0, 6);
  dataSource: Employee[] = [];

  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  myselectedFoods = ['Extra cheese', 'Mushroom'];

  columnsControl: FormControl = new FormControl(this.columnsToDisplay);

  $unSubscribeAll = new Subject();

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.displayedColumns.push('select');
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
