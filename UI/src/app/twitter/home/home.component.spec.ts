import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { By } from '@angular/platform-browser';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      imports: [HttpClientTestingModule, MatDialogModule, MatSnackBarModule, MatToolbarModule ],

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getTweets onInit', () => {
    spyOn(component, "getTweets");
    component.ngOnInit();
    expect(component.getTweets).toHaveBeenCalled(); 
  });

  it('should call postTweet on button clikc', () => {
    spyOn(component, "postTweet");
    fixture.debugElement.query(By.css('#post')).triggerEventHandler('click', null);
    expect(component.postTweet).toHaveBeenCalled(); 
  });

});
