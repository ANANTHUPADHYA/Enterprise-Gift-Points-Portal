import { Products, AdminService, ProductsService, Category } from 'src/app/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  public addEditCategoryForm: FormGroup;
  private subscriptions = new Subscription();
  private categoryId: string;
  public categories = [];
  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router: Router,
    private adminService: AdminService,
    private productsService: ProductsService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(data => {
      this.categoryId = data.id;
    });
    this.addEditCategoryForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
    if (this.categoryId) {
      this.getCategoryDetails();
    }
}
openSnackBar(message: string, className: string ) {
  this.snackBar.open(message, '', {
    duration: 5000,
    panelClass: ['mat-toolbar', className]
  });
}


  addCategory() {
    const payload = this.addEditCategoryForm.controls.name.value;
    this.subscriptions.add(
      this.adminService.addCategory(payload).subscribe(res => {
        this.openSnackBar(res.data, 'mat-accent');
        this.addEditCategoryForm.reset();
      }, error => {
        this.openSnackBar(error.error.error, 'mat-warn');
      }));
  }

  getCategoryDetails() {
    if (localStorage.getItem('category')) {
      const categoryDetails: Category = JSON.parse(localStorage.getItem('category'));
      this.addEditCategoryForm = this.formBuilder.group({
        name: [categoryDetails.name, Validators.required],
      });
    }
  }

  editCategory() {
    this.subscriptions.add(
      this.adminService.editCategory(this.categoryId, this.addEditCategoryForm.controls.name.value).subscribe(res => {
        this.openSnackBar(res.data, 'mat-accent');
        this.router.navigate(['/admin']);
      }, error => {
        this.openSnackBar(error.error.error, 'mat-warn');
      }));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    localStorage.removeItem('category');
  }

}
