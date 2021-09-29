import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectCountryModule } from '@angular-material-extensions/select-country';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header/header.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductComponent } from './components/product/products.component';
import { CartComponent } from './pages/cart/cart.component';
import { CategoryComponent } from './pages/category/category.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PageProductComponent } from './pages/product/product.component';
import { SearchComponent } from './pages/search/search.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { SharedModule } from './shared/shared.module';
import { ShopEffects } from './store/effects';
import { reducer } from './store/reducer';
import { RatingComponent } from './components/rating/rating.component';
import { FormComponent } from './components/form/form.component';
import { AccountComponent } from './pages/account/account.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cart', component: CartComponent },
  { path: 'category/:name', component: CategoryComponent },
  { path: 'product/:id', component: PageProductComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'search/:name', component: SearchComponent },
  { path: 'account', component: AccountComponent },
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' }
];
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ProductComponent,
    ProductListComponent,
    CartComponent,
    CategoryComponent,
    PageProductComponent,
    WishlistComponent,
    SearchComponent,
    NotFoundComponent,
    RatingComponent,
    FormComponent,
    AccountComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    MatFormFieldModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    MatSelectCountryModule.forRoot('de'),
    StoreModule.forRoot({ shop: reducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    EffectsModule.forRoot([ShopEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
