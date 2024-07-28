import { Routes } from '@angular/router';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { UsersComponent } from './employees/employees.component';

export const routes: Routes = [
    {path:'', component: UsersComponent},
    {path:'addEmployee', component: AddEmployeeComponent}
];
