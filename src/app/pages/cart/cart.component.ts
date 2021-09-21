import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Product } from '../../core/models/product.model'


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})


export class CartComponent implements OnInit {
  dataSource: Product[] = [];
  displayedColumns: string[] = ['id', 'image', 'title', 'price'];

  constructor(private store: Store<any>) {
    store.pipe(select('shop')).subscribe((state) => {
      this.dataSource = state.cart;

    })
  }

  ngOnInit(): void {

  }

}
