import { Router } from '@angular/router';
import { ProductsService, Products, AdminService } from 'src/app/core';
import { Subscription } from 'rxjs';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit, OnDestroy {
 public displayedColumns: string[] = ['name', 'category', 'price', 'discount', 'edit', 'delete'];
 public dataSource = new MatTableDataSource();
 private subscriptions = new Subscription();
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(private productService: ProductsService, private snackBar: MatSnackBar, private adminService: AdminService, private router: Router) {}
  ngOnInit() {
    this.getListOfProducts();
    this.dataSource.sort = this.sort;
  }
  
  openSnackBar(message: string, className: string) {
    this.snackBar.open(message, '', {
      duration: 5000,
      panelClass: ['mat-toolbar', className]
    });
  }
  getListOfProducts() {
    this.subscriptions.add(
      this.productService.getProductsList().subscribe(
        response => {
          if (response.success) {
            this.dataSource.data = response.data;
          }
        },
        error => {
          this.openSnackBar(error.error.error, 'mat-warn');
        }
      )
    );
  }

  removeProduct(product: string) {
    this.subscriptions.add(
      this.adminService.removeProduct(product).subscribe(
        response => {
          if (response.success) {
            this.openSnackBar(response.data, 'mat-accent');
            this.getListOfProducts();
          }
        },
        error => {
          this.openSnackBar(error.error.error, 'mat-warn');
        }
      )
    );
  }

  goToEdit(product: Products) {
    localStorage.setItem('product', JSON.stringify(product));
    this.router.navigate(['admin/add-product', {id: product._id}]);
  }


  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

}
