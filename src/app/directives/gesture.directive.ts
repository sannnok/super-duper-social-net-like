import { AfterViewInit, Directive, ElementRef, HostListener, Input, Renderer2, } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Directive({
  selector: '[appGesture]'
})
export class GestureDirective {

  @Input('appGesture') public sidenav?: MatDrawer;

  @HostListener('swipeleft', ['$event']) onSwipeLeft($event: any){
    this.toggleClass('swipeleft');
  }
  @HostListener('swiperight', ['$event']) onSwipeRight($event: any){
    this.toggleClass('swiperight');
  }

  private toggleClass(action: 'swiperight' | 'swipeleft') {
    action === 'swiperight'
      ? this.sidenav?.open()
      : this.sidenav?.close();
  }
}