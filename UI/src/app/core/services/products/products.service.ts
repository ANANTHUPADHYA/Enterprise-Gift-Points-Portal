import { urlConstants } from './../../rest-api.configuration';
import { ProductsAPIResponse, CategoriesResponse } from '../products/models/products.model';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  public baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = environment.url;
  }

  getProductsList(): Observable<ProductsAPIResponse> {
    return this.http.get<ProductsAPIResponse>(`${this.baseUrl}${urlConstants.PRODUCTS}`);
  }

  getCategories(): Observable<CategoriesResponse> {
    return this.http.get<CategoriesResponse>(`${this.baseUrl}${urlConstants.GET_CATEGORIES}`);
  }
}
