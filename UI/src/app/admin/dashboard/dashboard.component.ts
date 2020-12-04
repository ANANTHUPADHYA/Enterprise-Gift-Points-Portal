import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { Component, OnInit, OnDestroy } from '@angular/core';
import {AdminService} from 'src/app/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
public productsCount: number;
public categoriesCount: number;
public subscriptions = new Subscription();
  constructor(private snackBar: MatSnackBar, private adminService: AdminService, private router: Router) { }

  ngOnInit() {
    this.productsCount = 0;
    this.categoriesCount = 0;
    this.getCategoryCount();
    this.getProductsCount();
  }

  openSnackBar(message: string, className: string) {
    this.snackBar.open(message, '', {
      duration: 5000,
      panelClass: ['mat-toolbar', className]
    });
  }

  getProductsCount() {
    this.subscriptions.add(this.adminService.getProductCount().subscribe(response => {
      this.productsCount = response.data;
    },   error => {
      this.openSnackBar(error.error.error, 'mat-warn');
    })
    );
  }

  getCategoryCount() {
    this.subscriptions.add(this.adminService.getCategoryCount().subscribe(response => {
      this.categoriesCount = response.data;
    },   error => {
      this.openSnackBar(error.error.error, 'mat-warn');
    })
    );
  }

  goToProducts() {
    this.router.navigate(['admin/product']);
  }
  goToCategory() {
    this.router.navigate(['admin/category']);
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
