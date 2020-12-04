import { DashboardComponent } from './dashboard/dashboard.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AddProductComponent } from './add-product/add-product.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductComponent } from './product/product.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
        { path: '', component: DashboardComponent},
        {path: 'product', component: ProductComponent},
        {path: 'category', component: CategoriesComponent},
        {path: 'add-product', component: AddProductComponent},
        {path: 'add-category', component: AddCategoryComponent},
        {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
