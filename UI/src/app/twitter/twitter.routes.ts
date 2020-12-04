import { Routes } from "@angular/router";
import { AddTweetComponent } from "./add-tweet/add-tweet.component";
import { HomeComponent } from "./home/home.component";

export const twitterRoutes: Routes = [
    { path: '', component: HomeComponent},
    {path: 'post', component: AddTweetComponent},
 
];