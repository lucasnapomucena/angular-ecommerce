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
  formCreateAccount: FormField[] = [];
  formLoginAccount: FormField[] = [];
  formGroupCreate = new FormGroup({});
  formGroupLogin = new FormGroup({});

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.httpClient
      .get<FormField[]>('/assets/createAccountForm.json')
      .subscribe((data) => {
        for (const form of data) {
          this.formGroupCreate.addControl(
            form.name,
            new FormControl('', this.getValidator(form))
          );
        }
        this.formCreateAccount = data;
      });

    this.httpClient
      .get<FormField[]>('/assets/loginAccountForm.json')
      .subscribe((data) => {
        for (const form of data) {
          this.formGroupLogin.addControl(
            form.name,
            new FormControl('', this.getValidator(form))
          );
        }
        this.formLoginAccount = data;
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
}
