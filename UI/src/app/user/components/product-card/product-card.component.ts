import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared';
import { MatSnackBar } from '@angular/material';
import { Products, UserService, CartService } from 'src/app/core';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit, OnDestroy {
public showAdd: boolean;
@Input() productDetails: Products;
private subscriptions = new Subscription();
  constructor(private userService: UserService, private snackBar: MatSnackBar, private sharedService: SharedService,
    private cartService: CartService, private router: Router) { }
  ngOnInit() {
    this.showAdd = true;
  }

  openSnackBar(message: string, className: string ) {
    this.snackBar.open(message, '', {
      duration: 5000,
      panelClass: ['mat-toolbar', className]
    });
  }
  private get numberOfFullStars(): number {
    return this.productDetails.rating;
  }

  private get numberOfEmptyStars(): number {
    return 5 - this.productDetails.rating;
  }

  get fullStars(): any[] {
    return Array(this.numberOfFullStars);
  }

  get emptyStars(): any[] {
    return Array(this.numberOfEmptyStars);
  }

  addToCart() {
    if(sessionStorage.getItem('sessionID')) {
    this.subscriptions.add(this.cartService.addToCart(this.productDetails._id).subscribe(response => {
      this.sharedService.modifyCart.next(true);
      this.showAdd = !this.showAdd;
      this.openSnackBar(response.data, 'mat-accent');
    }, error => {
      this.openSnackBar(error.error.error, 'mat-warn');
    }));
    } else {
      this.router.navigate(['/login']);
    }
  }

  removeFromCart() {
    this.subscriptions.add(this.cartService.removeFromCart(this.productDetails._id).subscribe(response => {
      this.sharedService.modifyCart.next(true);
      this.showAdd = !this.showAdd;
      this.openSnackBar(response.data, 'mat-accent');
    }, error => {
      this.openSnackBar(error.error.error, 'mat-warn');
    }));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
