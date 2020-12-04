import { Products, AdminService, ProductsService } from 'src/app/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit, OnDestroy {

  public addEditProductForm: FormGroup;
  private subscriptions = new Subscription();
  private productId: string;
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
      this.productId = data.id;
    });
    this.addEditProductForm = this.formBuilder.group({
      discount: [0, Validators.required],
      name: ['', Validators.required],
      category: ['', Validators.required],
      price: [0, Validators.required],
      description: ['', Validators.required],
      file: [''],
      filename: ['']
    });
    this.getCategories();
    if (this.productId) {
      this.getProductsDetailsForEdit();
    }
}

handleFileInput(files: FileList) {
  this.addEditProductForm.controls.file.setValue(files.item(0));
  this.addEditProductForm.controls.filename.setValue(files.item(0).name);
}
openSnackBar(message: string, className: string ) {
  this.snackBar.open(message, '', {
    duration: 5000,
    panelClass: ['mat-toolbar', className]
  });
}
createPayload(): Products {
  let payload: Products = {
    discount: this.addEditProductForm.controls.discount.value,
    name: this.addEditProductForm.controls.name.value,
    category: this.addEditProductForm.controls.category.value,
    price: this.addEditProductForm.controls.price.value,
    description: this.addEditProductForm.controls.description.value,
    filename: '',
    file: ''
  };
  if(!this.productId) {
    payload.filename = this.addEditProductForm.controls.filename.value;
    payload.file = this.addEditProductForm.controls.file.value;
  }
  return payload;
}

  addProduct() {
    const payload = this.createPayload();
    this.subscriptions.add(
      this.adminService.addProduct(payload).subscribe(res => {
        this.openSnackBar(res.data, 'mat-accent');
        this.addEditProductForm.reset();
      }, error => {
        this.openSnackBar(error.error.error, 'mat-warn');
      }));
  }

  getProductsDetailsForEdit() {
    if (localStorage.getItem('product')) {
      const productDetails: Products = JSON.parse(localStorage.getItem('product'));
      this.addEditProductForm = this.formBuilder.group({
        discount: [productDetails.discount, Validators.required],
        name: [productDetails.name, Validators.required],
        category: [productDetails.category._id, Validators.required],
        price: [productDetails.price, Validators.required],
        description: [productDetails.description, Validators.required],

      });
    }
  }

  editProducts() {
    const payload = this.createPayload();
    this.subscriptions.add(
      this.adminService.editProduct(this.productId, payload).subscribe(res => {
        this.openSnackBar(res.data, 'mat-accent');
        this.router.navigate(['/admin']);
      }, error => {
        this.openSnackBar(error.error.error, 'mat-warn');
      }));
  }

  getCategories() {
    this.subscriptions.add(
    this.productsService.getCategories().subscribe(res => {
      if (res.success) {
        this.categories = res.data;
      }
    }, error => {
      this.openSnackBar(error.error.error, 'mat-warn');
    })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
    localStorage.removeItem('product');
  }

}
