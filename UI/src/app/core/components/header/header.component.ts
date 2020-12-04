import { Router } from '@angular/router';
import { UserService, UserData, LoginService } from 'src/app/core';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SharedService } from 'src/app/shared';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private subscriptions = new Subscription();
  public cartItems: number;
  public userData: UserData;
  public userEmail: string;
  public showLogIn: boolean;
  yoyoPoints: number;
  constructor(
    private sharedService: SharedService,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    if (sessionStorage.getItem('sessionID')) {
      this.initializeUser();
    } else {
    this.showLogIn = true;
    }
    this.subscriptions.add(
      this.sharedService.userLoggedIn.subscribe(isLoggedIn => {
        if (isLoggedIn) {
        this.initializeUser();
        }
      })
    );
    this.subscriptions.add(
      this.sharedService.modifyCart.subscribe(isAdd => {
        if (isAdd) {
         this.getCartCount();
         this.getUserData();
        }
      })
    );
  }

  initializeUser() {
    this.showLogIn = false;
    this.userEmail = sessionStorage.getItem('email');
    this.getUserData();
    this.getCartCount();
  }

  openSnackBar(message: string, className: string) {
    this.snackBar.open(message, '', {
      duration: 5000,
      panelClass: ['mat-toolbar', className]
    });
  }
  getCartCount() {
    this.subscriptions.add(
    this.userService.getCartCount(this.userEmail).subscribe(response => {
      if (response.success) {
        this.cartItems = response.data;
      }
    },
    error => {
      this.openSnackBar(error.error.error, 'mat-warn');
    })
    );
  }

  getUserData() {
    this.userData = JSON.parse(sessionStorage.getItem('profile'));
  }

  logout() {
          sessionStorage.clear();
          this.router.navigate(['/login']);
          this.showLogIn = true;
  }

  login() {
    this.router.navigate(['/login']);
    this.showLogIn = true;
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }
  goToAdmin() {
    this.router.navigate(['/admin']);
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
