import { AuthGuardGuard } from './core/auth-guard/auth-guard.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
    {
      path: 'products',
      loadChildren: () => import('./user/user.module').then(m => m.UserModule)
    },
    {
      path: 'cart',
      loadChildren: () => import('./cart/cart.module').then(m => m.CartModule),
      canActivate: [AuthGuardGuard]
    },
    {
      path: 'login',
      loadChildren: () => import('./login/login.module').then(m => m.LoginModule)
    },
    {
      path: 'admin',
      loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
      canActivate: [AuthGuardGuard],
      canActivateChild: [AuthGuardGuard]
    },

    {
      path: 'review',
      loadChildren: () => import('./twitter/twitter.module').then(m => m.TwitterModule),
    },
    { path: '', redirectTo: 'products', pathMatch: 'full' },
    // { path: '**', redirectTo: 'products', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
