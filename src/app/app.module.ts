import { Injectable, NgModule } from '@angular/core';
import { BrowserModule, HammerGestureConfig, HammerModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { UserProfilesWrapperComponent } from './components/user-profiles-wrapper/user-profiles-wrapper.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserPageComponent } from './components/user-page/user-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as Hammer from 'hammerjs';
import { GestureDirective } from './directives/gesture.directive';
import { UserPostsComponent } from './components/user-posts/user-posts.component';
import { AddressPipe } from './pipes/address.pipe';
import { EmojiPipe } from './pipes/emoji.pipe';
import { GeoComponent } from './components/geo/geo.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { ButtonComponent } from './components/lib/button/button.component';
import { FlowDirective } from './directives/flow.directive';

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
    GeoComponent,
    ButtonComponent,
    FlowDirective,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HammerModule,
    LeafletModule,
    MatSidenavModule,
    MatListModule,
    MatTabsModule,
    MatCardModule,
  ],
  providers: [
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: MyHammerConfig,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
