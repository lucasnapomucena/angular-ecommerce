import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { CepService } from '../../services/cep.service';
import { Product } from '../../core/models/product.model';
import { Subscription, Observable, EMPTY } from 'rxjs';

import { Router } from '@angular/router';
import { map, tap, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit, OnDestroy, OnChanges {
  products: Product[] = [];
  displayedColumns: string[] = ['image', 'title', 'price'];
  storeSubscription: Subscription;
  profileStatus: boolean = true;
  shippingStatus: boolean = false;
  paymentStatus: boolean = false;
  shippingFormStatus: boolean = false;
  total: number = 0;

  checkoutForm = this.formBuilder.group({
    name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    lastName: new FormControl(null, [
      Validators.required,
      Validators.minLength(3)
    ]),
    email: new FormControl(null, [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
    ]),
    document: new FormControl(null, [
      Validators.required
      //Validators.pattern(/^(\d{3}\.){2}\d{3}\-\d{2}$/)
    ]),
    phone: new FormControl(null, Validators.required)
  });

  shippingForm = this.formBuilder.group({
    cep: new FormControl(null, [Validators.required, this.cepValidator]),
    street: new FormControl({ value: null, disabled: true }, [
      Validators.required
    ]),
    number: new FormControl(null, [Validators.required]),
    complement: new FormControl(null),
    district: new FormControl({ value: null, disabled: true }, [
      Validators.required
    ]),
    city: new FormControl({ value: null, disabled: true }, [
      Validators.required
    ]),
    state: new FormControl({ value: null, disabled: true }, [
      Validators.required
    ])
  });

  paymentForm = this.formBuilder.group({
    card: new FormControl(null, [Validators.required]),
    cardFlag: new FormControl(null, [Validators.required]),
    name: new FormControl(null, [Validators.required]),
    month: new FormControl(null, [Validators.required]),
    year: new FormControl(null, [Validators.required]),
    cod: new FormControl(null, [Validators.required]),
    cpf: new FormControl(null, [Validators.required])
  });

  months = [
    { value: '01' },
    { value: '02' },
    { value: '03' },
    { value: '04' },
    { value: '05' },
    { value: '06' },
    { value: '07' },
    { value: '08' },
    { value: '09' },
    { value: '10' },
    { value: '11' },
    { value: '12' }
  ];

  years = [
    { value: '21' },
    { value: '22' },
    { value: '23' },
    { value: '24' },
    { value: '25' },
    { value: '26' },
    { value: '27' },
    { value: '28' },
    { value: '29' },
    { value: '30' },
    { value: '31' },
    { value: '32' },
    { value: '33' },
    { value: '34' }
  ];

  constructor(
    private store: Store<any>,
    private router: Router,
    private formBuilder: FormBuilder,
    private cepService: CepService
  ) {
    this.storeSubscription = store.pipe(select('shop')).subscribe((state) => {
      if (state.cart.length <= 0) {
        this.router.navigate(['cart']);
        return;
      }
      this.total = state.cart.reduce((acc, val) => acc + val.price, 0);
      this.products = state.cart;
    });
  }

  ngOnChanges() {}
  ngOnInit(): void {
    this.shippingForm
      .get('cep')
      .statusChanges.pipe(
        distinctUntilChanged(),
        switchMap((status) => {
          this.resetShippingForm();
          if (status === 'VALID') {
            return this.cepService.cepConsult(
              this.shippingForm.get('cep').value
            );
          } else {
            return EMPTY;
          }
        })
      )
      .subscribe((data) =>
        data ? this.shippingPatchValue(data) : this.resetShippingForm()
      );
  }

  ngOnDestroy() {
    this.storeSubscription.unsubscribe();
  }

  onSubmit(): void {
    if (!this.checkoutForm.valid) {
      return;
    }
    this.profileStatus = false;
    this.shippingStatus = true;
  }

  cepValidator(control: FormControl) {
    const cep = control.value;

    if (cep && cep !== '') {
      const validate = /^[0-9]{8}$/;
      return validate.test(cep) ? null : { cepInvalido: true };
    }
    return null;
  }

  resetShippingForm() {
    this.shippingForm.patchValue({
      street: null,
      complement: null,
      district: null,
      city: null,
      state: null
    });

    this.shippingFormStatus = false;
  }
  shippingPatchValue(data) {
    if (data) {
      this.shippingForm.patchValue({
        street: data.logradouro,
        complement: data.complemento,
        district: data.bairro,
        city: data.localidade,
        state: data.uf
      });

      this.shippingFormStatus = true;
    }
  }

  onEditProfile() {
    this.profileStatus = true;
  }

  onEditShipping() {
    this.shippingStatus = true;
    this.shippingFormStatus = true;
  }

  onPayment() {
    if (!this.shippingForm.valid && !this.checkoutForm.valid) {
      return;
    }

    this.shippingStatus = false;
    this.shippingFormStatus = false;
    this.paymentStatus = true;
  }
}
