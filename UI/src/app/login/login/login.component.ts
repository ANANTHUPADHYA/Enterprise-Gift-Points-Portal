import { SharedService } from 'src/app/shared';
import { MatSnackBar } from '@angular/material';
import { LoginService } from 'src/app/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup;
  private subscriptions = new Subscription();
  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router, private snackBar: MatSnackBar,
    private sharedService: SharedService) {
   this.loginForm = this.formBuilder.group({
      email: ['', Validators.email],
      password: ['', Validators.required]
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
    console.log('value', this.loginForm.value);
    this.subscriptions.add(this.loginService.loginUser(this.loginForm.value).subscribe(response => {
      if (response.success) {
       sessionStorage.setItem('email', this.loginForm.value.email);
       sessionStorage.setItem('sessionID', response.data.accessToken);
       sessionStorage.setItem('profile', JSON.stringify(response.data.profile));
       this.sharedService.userLoggedIn.next(true);
       this.router.navigate(['/products']);
      }
    }, error => {
      this.openSnackBar(error.error.error, 'mat-warn');
    }));
  }

  goToRegister() {
    this.router.navigate(['login/register'])
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
}
