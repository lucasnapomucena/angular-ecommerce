import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { RemoveFromCart } from '../../store/actions';
import { Product } from '../../core/models/product.model'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})

export class CartComponent implements OnInit {
  dataSource: Product[] = [];
  displayedColumns: string[] = ['id', 'image', 'title', 'price', 'action'];
  total: number = 0;

  constructor(private store: Store<any>, private router:Router) {
    store.pipe(select('shop')).subscribe((state) => {

      if(state.cart.length > 0) {
        this.dataSource = state.cart.map(cart => ({...cart, action: true}));
        this.total = state.cart.reduce((acc, val) => acc + val.price, 0)
      } else {
        this.dataSource = state.cart;
      }
    })
  }

  goToHome() {
    this.router.navigate([''])
  }
  removeFromCart(item: Product) {
    this.store.dispatch(new RemoveFromCart(item));
  }
  ngOnInit(): void {

  }

}
