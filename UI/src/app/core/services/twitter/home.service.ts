import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
tweetAdded = new Subject();
  constructor(private http: HttpClient) { }

  getTweets(): Observable<any> {
    return this.http.get<any>('http://127.0.0.1:8000/tweets/getTweets');
  }

  postTweet(data: string): Observable<any> {
    const params =new FormData();
    params.append('tweet', data);
    return this.http.post<any>('http://127.0.0.1:8000/tweets/setTweets/', params);
  }

  deleteTweet(id): Observable<any> {
    return this.http.post<any>(`http://127.0.0.1:8000/tweets/deleteTweets/${id}`, '')
  }
}
