import { ProductsService, Products, Category } from 'src/app/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-listing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss']
})
export class ProductListingComponent implements OnInit, OnDestroy {
  public array = [1, 2, 3, 4];
  public searchKey: string;
  public priceFilter: number;
  public selectedCategory: string[];
  public ratingFilter: number;
  public discountFilter: number;
  public categories: Category[];
  public listOfProducts: Products[];
  private originalList: Products[];
  private subscriptions = new Subscription();
  constructor(
    private productService: ProductsService,
    private snackBar: MatSnackBar
  ) {}
  ngOnInit() {
    this.listOfProducts = [];
    this.originalList = [];
    this.categories = [];
    this.getCategoies();
    this.getListOfProducts();
  }
  openSnackBar(message: string, className: string) {
    this.snackBar.open(message, '', {
      duration: 5000,
      panelClass: ['mat-toolbar', className]
    });
  }

  getCategoies() {
    this.subscriptions.add(
      this.productService.getCategories().subscribe(
        response => {
          this.categories = response.data;
        },
        error => {
          this.openSnackBar(error.error.error, 'mat-warn');
        }
      )
    );
  }

  getListOfProducts() {
    this.subscriptions.add(
      this.productService.getProductsList().subscribe(
        response => {
          if (response.success) {
            this.listOfProducts = response.data;
            this.originalList = response.data.slice();
          }
        },
        error => {
          this.openSnackBar(error.error.error, 'mat-warn');
        }
      )
    );
  }
  searchProducts() {
    if (this.searchKey && this.searchKey !== '') {
      const listOfData = this.originalList.slice();
      this.listOfProducts = listOfData.filter(product =>
        product.name.toLowerCase().includes(this.searchKey.toLowerCase())
      );
    } else {
      this.listOfProducts = this.originalList.slice();
    }
  }

  keyupFilter() {
    if (this.searchKey === '') {
      this.searchProducts();
    }
  }
  applyFilters() {
    let filteredProducts = this.originalList.slice();
    if (this.selectedCategory) {
      filteredProducts = filteredProducts.filter(product =>
        this.selectedCategory.includes(product.category.name)
      );
    }
    if (this.priceFilter) {
      filteredProducts = filteredProducts.filter(
        product => product.price <= +this.priceFilter
      );
    }
    if (this.discountFilter) {
      filteredProducts = filteredProducts.filter(
        product => product.discount <= +this.discountFilter
      );
    }
    if (this.ratingFilter) {
      filteredProducts = filteredProducts.filter(
        product => product.rating === this.ratingFilter
      );
    }
    this.listOfProducts = filteredProducts.slice();
  }

  clearFilters() {
    this.listOfProducts = this.originalList.slice();
    this.selectedCategory = [];
    this.priceFilter = 1;
    this.discountFilter = 1;
    this.ratingFilter = 1;

  }
  formatLabel(value: number): number | string {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }
  formatDiscount(value: number): number | string {
    return value + '%';
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
