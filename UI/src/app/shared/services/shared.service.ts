import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
public modifyCart = new Subject();
public userLoggedIn = new Subject();
  constructor() { }
}
