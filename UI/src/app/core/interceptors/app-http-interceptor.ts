import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the session.
    const authToken = sessionStorage.getItem('sessionID');

    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    if (authToken) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization',  `Bearer ${authToken}`)
    });
     // send cloned request with header to the next handler.
    return next.handle(authReq);
  }

    return next.handle(req);
  }
}
