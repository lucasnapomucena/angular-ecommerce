import { HttpClientModule } from '@angular/common/http';
import { ShopEffects } from './store/effects';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule} from './shared/shared.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './components/header/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ShopReducer } from './store/reducer';
import { ProductComponent } from './components/product/products.component';
import {ProductListComponent} from './components/product-list/product-list.component';
import { environment } from '../environments/environment';
import { CartComponent } from './pages/cart/cart.component';
import { CategoryComponent } from './pages/category/category.component';
import { PageProductComponent} from './pages/product/product.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { SearchComponent } from './pages/search/search.component';
import { NotFoundComponent } from './pages/not-found/not-found.component'

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'cart', component: CartComponent},
  {path: 'category/:name', component: CategoryComponent},
  {path: 'product/:id', component: PageProductComponent},
  {path: 'wishlist', component: WishlistComponent},
  {path: 'search/:name', component: SearchComponent},
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404'}
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
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forRoot({ shop: ShopReducer }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([ShopEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
