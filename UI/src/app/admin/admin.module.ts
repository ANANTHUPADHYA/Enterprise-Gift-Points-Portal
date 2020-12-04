import { MaterialModule } from './../material/material.module';
import { AdminRoutingModule } from './admin-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductComponent } from './product/product.component';
import { CategoriesComponent } from './categories/categories.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AddProductComponent } from './add-product/add-product.component';

@NgModule({
  declarations: [DashboardComponent, ProductComponent, CategoriesComponent, AddCategoryComponent, AddProductComponent],
  imports: [
    CommonModule,
   AdminRoutingModule,
   MaterialModule
  ]
})
export class AdminModule { }
