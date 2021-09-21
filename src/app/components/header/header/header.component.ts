
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private store: Store<any>, private router: Router) {
    store.pipe(select('shop')).subscribe((state) => {
      let total = state.cart.reduce(this.getTotal, 0);
      this.products = state.cart;
      this.wishlist = state.wishlist
      this.total = total;
    })
  }
  ngOnInit() {
  }

  getTotal(total, item) {
   return total + (item.price * 1);
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }
}
