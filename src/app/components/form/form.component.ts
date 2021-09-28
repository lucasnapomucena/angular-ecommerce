import { Component, Input, OnInit, Output } from '@angular/core';
import { FormField } from './../../core/models/form.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  @Input() forms: FormField[];
  @Input() form: FormGroup;

  constructor() {}

  ngOnInit(): void {}
}
