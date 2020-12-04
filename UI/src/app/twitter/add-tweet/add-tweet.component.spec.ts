import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTweetComponent } from './add-tweet.component';
import { of, Subject, Observable } from 'rxjs';
import { MatSnackBarModule, MatSnackBarRef, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeService } from 'src/app/core';

let MockHomeService =  {
  tweetAdded:new Subject(),
  postTweet(tweet):Observable<any> {
    return of ( {"created_at":"Sat Oct 03 13:54:16 +0000 2020","id":1312390516693061637,"id_str":"1312390516693061637","text":"Yaaaaaaa","truncated":false,"entities":{"hashtags":[],"symbols":[],"user_mentions":[],"urls":[]},"source":"","in_reply_to_status_id":null,"in_reply_to_status_id_str":null,"in_reply_to_user_id":null,"in_reply_to_user_id_str":null,"in_reply_to_screen_name":null,"user":{"id":813449480452247553,"id_str":"813449480452247553","name":"Deesha Desai","screen_name":"deesha_desai","location":"","description":"","url":null,"entities":{"description":{"urls":[]}},"protected":true,"followers_count":1,"friends_count":99,"listed_count":0,"created_at":"Mon Dec 26 18:20:44 +0000 2016","favourites_count":0,"utc_offset":null,"time_zone":null,"geo_enabled":false,"verified":false,"statuses_count":7,"lang":null,"contributors_enabled":false,"is_translator":false,"is_translation_enabled":false,"profile_background_color":"F5F8FA","profile_background_image_url":null,"profile_background_image_url_https":null,"profile_background_tile":false,"profile_image_url":"http:\/\/abs.twimg.com\/sticky\/default_profile_images\/default_profile_normal.png","profile_image_url_https":"https:\/\/abs.twimg.com\/sticky\/default_profile_images\/default_profile_normal.png","profile_link_color":"1DA1F2","profile_sidebar_border_color":"C0DEED","profile_sidebar_fill_color":"DDEEF6","profile_text_color":"333333","profile_use_background_image":true,"has_extended_profile":false,"default_profile":true,"default_profile_image":true,"following":false,"follow_request_sent":false,"notifications":false,"translator_type":"none"},"geo":null,"coordinates":null,"place":null,"contributors":null,"is_quote_status":false,"retweet_count":0,"favorite_count":0,"favorited":false,"retweeted":false,"lang":"und"})
}
}
class MatSnackBar {
  open() {
    return;
  }
}
describe('AddTweetComponent', () => {
  let component: AddTweetComponent;
  let fixture: ComponentFixture<AddTweetComponent>;
  let MockMatSnackBar: MatSnackBar;

  beforeEach(async () => {
    
    MockMatSnackBar = new MatSnackBar()
    await TestBed.configureTestingModule({
      declarations: [ AddTweetComponent ],
      providers: [{provide: MatSnackBarRef, useValue: {}},
      {provide: HomeService, useValue: MockHomeService},
    {provide: MAT_SNACK_BAR_DATA, useValue: {}},
  {provide: MatSnackBar, useValue: MockMatSnackBar},
  { provide: MatDialog, useValue: {} }],
      imports: [HttpClientTestingModule, MatSnackBarModule, MatDialogModule,MatFormFieldModule, MatInputModule, MatToolbarModule, BrowserAnimationsModule],
      
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTweetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call postTweet', () => {
    spyOn(component, "postTweet");
    fixture.debugElement.query(By.css('#postTweet')).triggerEventHandler('click', null);
    expect(component.postTweet).toHaveBeenCalled(); 
  });
  it('should post tweet successfully', () => {
    spyOn(MockHomeService, 'postTweet').and.returnValue(of({"created_at":"Sat Oct 03 13:54:16 +0000 2020","id":1312390516693061637,"id_str":"1312390516693061637","text":"Yaaaaaaa","truncated":false,"entities":{"hashtags":[],"symbols":[],"user_mentions":[],"urls":[]},"source":"","in_reply_to_status_id":null,"in_reply_to_status_id_str":null,"in_reply_to_user_id":null,"in_reply_to_user_id_str":null,"in_reply_to_screen_name":null,"user":{"id":813449480452247553,"id_str":"813449480452247553","name":"Deesha Desai","screen_name":"deesha_desai","location":"","description":"","url":null,"entities":{"description":{"urls":[]}},"protected":true,"followers_count":1,"friends_count":99,"listed_count":0,"created_at":"Mon Dec 26 18:20:44 +0000 2016","favourites_count":0,"utc_offset":null,"time_zone":null,"geo_enabled":false,"verified":false,"statuses_count":7,"lang":null,"contributors_enabled":false,"is_translator":false,"is_translation_enabled":false,"profile_background_color":"F5F8FA","profile_background_image_url":null,"profile_background_image_url_https":null,"profile_background_tile":false,"profile_image_url":"http:\/\/abs.twimg.com\/sticky\/default_profile_images\/default_profile_normal.png","profile_image_url_https":"https:\/\/abs.twimg.com\/sticky\/default_profile_images\/default_profile_normal.png","profile_link_color":"1DA1F2","profile_sidebar_border_color":"C0DEED","profile_sidebar_fill_color":"DDEEF6","profile_text_color":"333333","profile_use_background_image":true,"has_extended_profile":false,"default_profile":true,"default_profile_image":true,"following":false,"follow_request_sent":false,"notifications":false,"translator_type":"none"},"geo":null,"coordinates":null,"place":null,"contributors":null,"is_quote_status":false,"retweet_count":0,"favorite_count":0,"favorited":false,"retweeted":false,"lang":"und"})); // create spy
    component.postTweet();
    expect(MockHomeService.postTweet).toHaveBeenCalled();

  })
});
