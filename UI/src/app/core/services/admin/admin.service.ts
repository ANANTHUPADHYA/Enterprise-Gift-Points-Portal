import { Products } from 'src/app/core';
import { GetCount, APIResponse } from './models/admin.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { urlConstants } from '../../rest-api.configuration';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  public baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = environment.url;
  }

  
  getProductCount(): Observable<GetCount> {
    return this.http.get<GetCount>(`${this.baseUrl}${urlConstants.PRODUCT_COUNT}`);
  }
  getCategoryCount(): Observable<GetCount> {
    return this.http.get<GetCount>(`${this.baseUrl}${urlConstants.CATEGORIES_COUNT}`);
  }

  removeProduct(product: string): Observable<APIResponse> {
    const admin = JSON.parse(sessionStorage.getItem('profile')).admin;
    return this.http.delete<APIResponse>(`${this.baseUrl}${urlConstants.DELETE_PRODUCT}/${product}?admin=${admin}`);
  }
  removeCategory(category: string): Observable<APIResponse> {
    const admin = JSON.parse(sessionStorage.getItem('profile')).admin;
    return this.http.delete<APIResponse>(`${this.baseUrl}${urlConstants.DELETE_CATEGORY}/${category}?admin=${admin}`);
  }

  addProduct(product: any): Observable<APIResponse> {
    const formData: FormData = new FormData();
    formData.append('file', product.file, product.filename);
    formData.append('description', product.description);
    formData.append('discount', product.discount);
    formData.append('name', product.name);
    formData.append('category', product.category);
    formData.append('price', product.price);

    const admin = JSON.parse(sessionStorage.getItem('profile')).admin;

    return this.http.post<APIResponse>(`${this.baseUrl}${urlConstants.ADD_PRODUCT}?admin=${admin}`, formData);
}

addCategory(name: string): Observable<APIResponse> {
  const admin = JSON.parse(sessionStorage.getItem('profile')).admin;

  return this.http.post<APIResponse>(`${this.baseUrl}${urlConstants.ADD_CATEGORY}?admin=${admin}`, {name});
}

editProduct(id: string, payload: Products): Observable<APIResponse> {
  const admin = JSON.parse(sessionStorage.getItem('profile')).admin;

  return this.http.put<APIResponse>(`${this.baseUrl}${urlConstants.EDIT_PRODUCT}/${id}?admin=${admin}`, payload);
}
editCategory(id: string, name: string): Observable<APIResponse> {
  const admin = JSON.parse(sessionStorage.getItem('profile')).admin;

  return this.http.put<APIResponse>(`${this.baseUrl}${urlConstants.EDIT_CATEGORY}/${id}?admin=${admin}`, {name});
}
}
