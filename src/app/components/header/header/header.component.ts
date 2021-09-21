
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  products: [];
  wishlist: [];
  total: number = 0;
  form: FormGroup;
  submitted: boolean = false;

  constructor(private store: Store<any>, private router: Router, private formBuilder: FormBuilder) {
    store.pipe(select('shop')).subscribe((state) => {
      let total = state.cart.reduce(this.getTotal, 0);
      this.products = state.cart;
      this.wishlist = state.wishlist
      this.total = total;
    })
  }
  ngOnInit() {

    this.form = this.formBuilder.group({
      search: ['', Validators.required],
      })
  }

  getTotal(total, item) {
   return total + (item.price * 1);
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }

  onSubmitSearch() {

    this.router.navigate(['/search',  this.form.value.search])
    this.form.reset()
  }
}
