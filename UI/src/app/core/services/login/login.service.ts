import { urlConstants } from './../../rest-api.configuration';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginResponse, RegisterParams, RegisterResponse } from './models';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
private baseUrl: string;
  constructor(private http: HttpClient) {
    this.baseUrl = environment.url;
   }


  loginUser({email, password}): Observable<LoginResponse> {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: `Basic ${window.btoa(email + ':' + password)}`
  });
    return this.http.get<LoginResponse>(`http://127.0.0.1:9000${urlConstants.LOGIN}`,{headers: httpHeaders});
  }


  registerUser(userDetails: RegisterParams, password:string, email:string):  Observable<RegisterResponse> {
    const httpHeaders: HttpHeaders = new HttpHeaders({
      Authorization: `Basic ${window.btoa(email + ':' + password)}`
  });
    return this.http.post<RegisterResponse>(`http://127.0.0.1:9000${urlConstants.REGISTER}`, userDetails, {headers: httpHeaders}); 
  }

  logout():Observable<LoginResponse> {
    return this.http.get<LoginResponse>(`http://127.0.0.1:9000${urlConstants.LOGOUT}`);
  }

}
