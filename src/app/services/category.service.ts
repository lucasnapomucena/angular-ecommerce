import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CategoryService implements OnInit {
  public name: string;

  constructor(private httpClient: HttpClient, private route: ActivatedRoute) {}

  getCategory(params: string) {
    return this.httpClient.get(
      'https://fakestoreapi.com/products/category/' + params
    );
  }

  ngOnInit() {
    this.name = this.route.snapshot.paramMap.get('name');
  }
}
