import { UserDataResponse, CartResponse } from './models/user.model';
import { urlConstants } from './../../rest-api.configuration';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
public baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = environment.url;
  }

  getUserDetails(email: string): Observable<UserDataResponse> {
    return this.http.get<UserDataResponse>(`${this.baseUrl}${urlConstants.USER_DATA}/${email}`);
  }

  getCartCount(email: string): Observable<CartResponse> {
    return this.http.get<CartResponse>(`${this.baseUrl}${urlConstants.CART_COUNT}?email=${email}`);
  }

}
