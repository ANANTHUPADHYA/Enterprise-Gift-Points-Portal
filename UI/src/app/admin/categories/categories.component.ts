import { Router } from '@angular/router';
import {
  ProductsService,
  Products,
  AdminService,
  Category
} from 'src/app/core';
import { Subscription } from 'rxjs';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, OnDestroy {
  public displayedColumns: string[] = ['name', 'edit', 'delete'];
  public dataSource = new MatTableDataSource();
  private subscriptions = new Subscription();
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private productService: ProductsService,
    private snackBar: MatSnackBar,
    private adminService: AdminService,
    private router: Router
  ) {}
  ngOnInit() {
    this.getListOfCategories();
    this.dataSource.sort = this.sort;
  }

  openSnackBar(message: string, className: string) {
    this.snackBar.open(message, '', {
      duration: 5000,
      panelClass: ['mat-toolbar', className]
    });
  }
  getListOfCategories() {
    this.subscriptions.add(
      this.productService.getCategories().subscribe(
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

  removeCategory(category: string) {
    this.subscriptions.add(
      this.adminService.removeCategory(category).subscribe(
        response => {
          if (response.success) {
            this.openSnackBar(response.data, 'mat-accent');
            this.getListOfCategories();
          }
        },
        error => {
          this.openSnackBar(error.error.error, 'mat-warn');
        }
      )
    );
  }

  goToEdit(category: Category) {
    localStorage.setItem('category', JSON.stringify(category));
    this.router.navigate(['admin/add-category', { id: category._id }]);
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
