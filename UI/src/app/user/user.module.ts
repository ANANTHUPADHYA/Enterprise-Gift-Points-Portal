import { MaterialModule } from './../material/material.module';
import { USER_ROUTES } from './user.routes';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListingComponent } from './components/product-listing/product-listing.component';
import { ProductCardComponent } from './components/product-card/product-card.component';

@NgModule({
  declarations: [ProductListingComponent, ProductCardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(USER_ROUTES),
    MaterialModule
  ]
})
export class UserModule { }
