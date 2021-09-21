import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {Product } from './../../core/models/product.model'

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})


export class CategoryComponent implements OnInit {
  name: string = '';
  items: Product[] = [];

  constructor(private route: ActivatedRoute,  private httpClient: HttpClient) {
  }

  ngOnInit() {
    if(this.route.params == null) {
      return;
    }
    this.route.params
      .subscribe(
        (params: Params) => {
          this.name = params['name'];

          this.getProductToCategory(this.name).subscribe(product => {
            this.items = product;
          })
        }
      );
   }
   getProductToCategory(params: string): Observable<Product[]> {
    return this.httpClient.get<Product[]>('https://fakestoreapi.com/products/category/'+ params)
  }

}
