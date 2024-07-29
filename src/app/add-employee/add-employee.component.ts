import { Component } from '@angular/core';
import {
  FormsModule,
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [FormsModule, NgFor, ReactiveFormsModule, NgIf],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.css',
})
export class AddEmployeeComponent {
  employeeForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.employeeForm = this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      bDay: ['', [Validators.required, Validators.pattern('^[0-9]+(\\.[0-9]+){0,2}$')]],
      position: ['', Validators.required],
    });
  }
  onSubmit() {
    if (this.employeeForm.valid) {
      console.log(this.employeeForm.value);
    }
    this.resetForm()
  }

  resetForm() {
    this.employeeForm.reset({
      name: '',
      lastName: '',
      bDay: '',
      position: '',
    });
  }
}
