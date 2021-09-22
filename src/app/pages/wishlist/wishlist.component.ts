import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { Product } from '../../core/models/product.model';
import { GetItemsWishlist } from '../../store/actions';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  wishlist: Product[] = [];
  wishlistStatus: boolean;

  constructor(private store: Store<any>) {
    store
      .pipe(select('shop'))
      .subscribe((state) => (this.wishlist = state.wishlist));
  }

  ngOnInit(): void {
    this.wishlistStatus = true;
    this.store.dispatch(new GetItemsWishlist());
  }
}
