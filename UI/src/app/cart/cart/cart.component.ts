import { SharedService } from 'src/app/shared';
import { MatDialog, MatDialogRef, MatSnackBar } from '@angular/material';
import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { CartProduct, CartService } from 'src/app/core';
import { Subscription } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';
import { ReviewComponent } from '../review/review.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CartComponent implements OnInit, OnDestroy {
  public myCartItems: CartProduct[];
  private subscriptions = new Subscription();
  public email = new FormControl('', Validators.required);
  public message = new FormControl('');
  public showSpinner: boolean;
  constructor(private cartService: CartService, private snackBar: MatSnackBar, private sharedService: SharedService, private dialog: MatDialog) { }

  ngOnInit() {
    this.myCartItems = [];
    this.showSpinner = false;
    this.email.setValue(sessionStorage.getItem('email'));
    this.getCartData();
  }

  openSnackBar(message: string, className: string) {
    this.snackBar.open(message, '', {
      duration: 5000,
      panelClass: ['mat-toolbar', className]
    });
  }

  getCartData() {
    this.subscriptions.add(
    this.cartService.getCartItems().subscribe(response => {
      if (response.success) {
      this.myCartItems = response.data[0].products;
      }
    },   error => {
      this.openSnackBar(error.error.error, 'mat-warn');
    })
    );
  }

  getOfferPrice(price, discount): number {
   return Math.round(price - ( price * discount / 100 ));
  }

  getTotalItems(): number {
    const total = this.myCartItems.reduce(
      (acc, product) => acc + product.quantity, 0
    );
    return total;
  }

  getTotalPrice(): number {
    const total = this.myCartItems.reduce(
      (acc, product) => acc + (product.quantity * this.getOfferPrice( product.product.price,  product.product.discount)),0
    );
    return total;
  }

  increaseQuantity(product: CartProduct) {
    product.quantity += 1;
    this.updateCart(product);
  }

  decreaseQuantity(product: CartProduct) {
    product.quantity -= 1;
    if (product.quantity === 0) {
      this.removeFromCart(product);
    } else {
      this.updateCart(product);
    }
  }

  updateCart(product: CartProduct) {
    this.subscriptions.add(
    this.cartService.updateQuantity(product.product._id, product.quantity).subscribe(response => {
      if (response.success) {
        this.openSnackBar(response.data, 'mat-accent');
      }
    }, error => {
      this.openSnackBar(error.error.error, 'mat-warn');
    })
    );
  }

  removeFromCart(product: CartProduct) {
    this.subscriptions.add(this.cartService.removeFromCart(product.product._id).subscribe(response => {
      this.openSnackBar(response.data, 'mat-accent');
      this.getCartData();
      this.sharedService.modifyCart.next(true);
    }, error => {
      this.openSnackBar(error.error.error, 'mat-warn');
    }));
  }

  getProductList(): string {
    let prod ='';
   this.myCartItems.forEach(ele => {
    prod += ele.product.name+ ', '
   });
   return prod;
  }
  checkOut() {


    this.showSpinner = true;
    const price = JSON.parse(sessionStorage.getItem('profile')).yoyoPoints -  this.getTotalPrice();
    if (price < 0) {
      this.openSnackBar('Insufficient Points. Please remove some items to proceed', 'mat-warn');
    } else {

    this.subscriptions.add(this.cartService.checkoutCart(this.email.value, this.message.value, this.getProductList()).subscribe(response => {
      if(response.success) {
        this.cartService.updatePoints(price).subscribe(res => {
          if(res.success) {
            this.openSnackBar('Order placed successfully!!', 'mat-accent');
            this.getCartData();
            this.showSpinner = false;
            const profile  = JSON.parse(sessionStorage.getItem('profile'));
            profile.yoyoPoints = JSON.stringify(price);
            sessionStorage.setItem('profile',JSON.stringify(profile));
            this.sharedService.modifyCart.next(true);
            this.dialog.open(ReviewComponent, {
              width:'400px',
              height: '400px'
            });
            
          }
        })
      }
    
    }, error => {
      this.showSpinner = false;
      this.openSnackBar(error.error.error, 'mat-warn');
    }));
    }
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
