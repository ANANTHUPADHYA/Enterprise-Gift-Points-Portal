import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/core';
import { SharedService } from 'src/app/shared';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;
  private subscriptions = new Subscription();
  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router, private snackBar: MatSnackBar,
    private sharedService: SharedService) {
   this.registerForm = this.formBuilder.group({
      email: ['', Validators.email],
      password: ['', Validators.required],
      firstName:['', Validators.required],
      lastName: ['', Validators.required],
      yoyoPoints:[0, Validators.required],
      admin: ["false"]
    });
   }
  ngOnInit() {
  }

  openSnackBar(message: string, className: string) {
    this.snackBar.open(message, '', {
      duration: 5000,
      panelClass: ['mat-toolbar', className]
    });
  }


  onSubmit() {
      const params = this.registerForm.value;
      delete params['email'];
      delete params['password'];
    console.log('value', this.registerForm.value);

    this.subscriptions.add(this.loginService.registerUser(params, this.registerForm.controls.password.value, this.registerForm.controls.email.value).subscribe(response => {
      if (response.success) {
        this.openSnackBar(response.data, 'mat-primary');
       this.router.navigate(['login']);
      }
    }, error => {
      this.openSnackBar(error.error.error, 'mat-warn');
    }));
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
