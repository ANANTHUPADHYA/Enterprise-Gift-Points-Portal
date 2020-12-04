import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart/cart.component';
import { RouterModule } from '@angular/router';
import { CART_ROUTES } from './cart.routes';
import { ReviewComponent } from './review/review.component';

@NgModule({
  declarations: [CartComponent, ReviewComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(CART_ROUTES),
    MaterialModule
  ],
  entryComponents: [
    ReviewComponent
  ]
})
export class CartModule { }
