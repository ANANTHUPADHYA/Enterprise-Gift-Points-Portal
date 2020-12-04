
import { Component, OnInit } from '@angular/core';
import {  MatSnackBar } from '@angular/material/snack-bar';
import { HomeService } from 'src/app/core';

@Component({
  selector: 'app-add-tweet',
  templateUrl: './add-tweet.component.html',
  styleUrls: ['./add-tweet.component.scss']
})
export class AddTweetComponent implements OnInit {
public twitterID='';
public tweet='';
  constructor(public homeService: HomeService, public _snackBar: MatSnackBar) { }
  
  postTweet() {
    this.homeService.postTweet(this.twitterID+ ' ' +this.tweet).subscribe(data =>{

      if(data.errors && data.errors.length) {
        this._snackBar.open(data.errors[0].message,'', {
          duration: 2000,
          panelClass: ['mat-toolbar', 'mat-warn']
        }); 
      } else {
      this._snackBar.open('Tweet Added','', {
        duration: 2000,
        panelClass: ['mat-toolbar', 'mat-accent']
      });
      this.homeService.tweetAdded.next(true);
    }
    }, error => {
      console.log(error);
    })
  }
  ngOnInit(): void {
  }

}
