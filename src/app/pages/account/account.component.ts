import { HttpClient } from '@angular/common/http';
import {
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FormField } from './../../core/models/form.model';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  forms: FormField[] = [];
  form = new FormGroup({});
  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.httpClient
      .get<FormField[]>('/assets/schemaForm.json')
      .subscribe((data) => {
        for (const form of data) {
          this.form.addControl(
            form.name,
            new FormControl('', this.getValidator(form))
          );
        }
        this.forms = data;
      });
  }

  private getValidator(formField: FormField): ValidatorFn {
    switch (formField.validator) {
      case 'email':
        return Validators.email;
      case 'required':
        return Validators.required;
      default:
        return null;
    }
  }
  onSubmit(): void {
    if (this.form.valid) {
      let value = this.form.value;
    }
  }
}
