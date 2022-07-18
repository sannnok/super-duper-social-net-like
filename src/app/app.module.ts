import { Injectable, NgModule } from '@angular/core';
import { BrowserModule, HammerGestureConfig, HammerModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UserProfilesWrapperComponent } from './components/user-profiles-wrapper/user-profiles-wrapper.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as Hammer from 'hammerjs';
import { GestureDirective } from './directives/gesture.directive';
import { UserPostsComponent } from './components/user-posts/user-posts.component';
import { DataService } from './services/data.service';
import { AddressPipe } from './pipes/address.pipe';
import { EmojiPipe } from './pipes/emoji.pipe';


const MOBILE_REGEX = /mobile|tablet|ip(ad|hone|od)|android/i;
const isMobile = MOBILE_REGEX.test(navigator.userAgent);
@Injectable()
export class MyHammerConfig extends HammerGestureConfig {
  override overrides = <any> {
    swipe: { direction: Hammer.DIRECTION_ALL },
  };
  override buildHammer(element: HTMLElement) {
    return  new Hammer(element, {
      inputClass: Hammer.TouchMouseInput,
    })
  }
}
@NgModule({
  declarations: [
    AppComponent,
    UserProfilesWrapperComponent,
    UserListComponent,
    UserPageComponent,
    GestureDirective,
    UserPostsComponent,
    AddressPipe,
    EmojiPipe,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSidenavModule,
    MatListModule,
    HammerModule,
  ],
  providers: [
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig,
    },
    // {
    //   provide : GeoService,
    //   useFactory: (userDataService: DataService) => {
    //     userDataService.
    //   },
    //   deps: [DataService]
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
