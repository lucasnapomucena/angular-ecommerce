import { Component, OnInit, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GetItems } from '../../store/actions';
import { Product } from '../../core/models/product.model';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit,OnDestroy  {
  items: Product[] = []
  param: string;
  paramsSubscription : Subscription;
  storeSubscription: Subscription;

  constructor(private store: Store<any>, private activeRoute: ActivatedRoute, private route: Router) {
  }

  ngOnInit(): void {
    this.store.dispatch(new GetItems());

    this.paramsSubscription = this.activeRoute.params.subscribe(params => {
      this.param = params['name'];

      this.storeSubscription = this.store.pipe(select('shop')).subscribe((state) => {

        const products = state.items.filter(product => product.title.toLowerCase().includes(this.param.toLowerCase()));

        if(products.length <= 0) {
          this.route.navigate(['/not-found']);
          return;
        }
        this.items = products;
        });
    })
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
    this.storeSubscription.unsubscribe();
  }

}
