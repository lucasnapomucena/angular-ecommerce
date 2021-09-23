import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { Product } from '../../core/models/product.model';
import { GetItems } from '../../store/actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  items: Product[] = [];

  constructor(private store: Store<any>) {
    store.pipe(select('shop')).subscribe((state) => (this.items = state.items));
  }

  ngOnInit(): void {
    this.store.dispatch(GetItems());
  }
}
