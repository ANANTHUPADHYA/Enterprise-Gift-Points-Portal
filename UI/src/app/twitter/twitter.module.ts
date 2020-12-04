import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTweetComponent } from './add-tweet/add-tweet.component';
import { HomeComponent } from './home/home.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import { twitterRoutes } from './twitter.routes';

@NgModule({
  declarations: [AddTweetComponent, HomeComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(twitterRoutes)
  ]
})
export class TwitterModule { }
