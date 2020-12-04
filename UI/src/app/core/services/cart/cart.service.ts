import { AddToCartResponse, CartDataResponse } from './models/cart.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, ObservableLike } from 'rxjs';
import { urlConstants } from '../../rest-api.configuration';
import { LoginResponse } from '../login';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = environment.url;
  }

  addToCart(product: string): Observable<AddToCartResponse> {
    
    return this.http.post<AddToCartResponse>(`${this.baseUrl}${urlConstants.ADD_CART}?email=${sessionStorage.getItem('email')}`, {product});
  }

  removeFromCart(product: string): Observable<AddToCartResponse> {
    return this.http.delete<AddToCartResponse>(`${this.baseUrl}${urlConstants.REMOVE_FROM_CART}/${product}?email=${sessionStorage.getItem('email')}`);
  }

  getCartItems(): Observable<CartDataResponse> {
    return this.http.get<CartDataResponse>(`${this.baseUrl}${urlConstants.GET_CART}?email=${sessionStorage.getItem('email')}`);
  }

  updateQuantity(product:string, quantity: number): Observable<AddToCartResponse> {
    return this.http.put<AddToCartResponse>(`${this.baseUrl}${urlConstants.MODIFY_CART}/${product}?email=${sessionStorage.getItem('email')}`, {quantity});
  }

  checkoutCart(email: string, message: string, prodList): Observable<AddToCartResponse> {
    const firstname = JSON.parse(sessionStorage.getItem('profile')).firstName;
    const lastname = JSON.parse(sessionStorage.getItem('profile')).lastName;
    return this.http.post<AddToCartResponse>(`${this.baseUrl}${urlConstants.CHECKOUT}?email=${sessionStorage.getItem('email')}`, {email, firstname, lastname,message, prodList});
  }

  updatePoints(remainingPoints: number): Observable<LoginResponse> {
    return this.http.put<LoginResponse>(`http://127.0.0.1:9000${urlConstants.UPDATE_POINTS}`, {yoyoPoints: JSON.stringify(remainingPoints)});
  }
}
