import { AfterViewInit, Directive, ElementRef, HostListener, Input, Renderer2, } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

@Directive({
  selector: '[appGesture]'
})
export class GestureDirective implements AfterViewInit {

  @Input('appGesture') public sidenav?: MatDrawer;

  @HostListener('swipeleft', ['$event']) onSwipeLeft($event: any){
    console.log('swipeleft')
    this.toggleClass('swipeleft');
  }
  @HostListener('swiperight', ['$event']) onSwipeRight($event: any){
    this.toggleClass('swiperight');
    console.log('swiperight')

  }
  
  ngAfterViewInit() {
    console.log('Gest dir active', this.sidenav)
  }

  private toggleClass(action: 'swiperight' | 'swipeleft') {
    action === 'swiperight'
      ? this.sidenav?.open()
      : this.sidenav?.close();
  }
}