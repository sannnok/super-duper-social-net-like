import { AfterViewInit, Directive, ElementRef, HostListener, Input, Renderer2, } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { SidenavService } from '../services/core/sidenav.service';

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

  constructor(private sidenavService: SidenavService) {}

  private toggleClass(action: 'swiperight' | 'swipeleft') {
    this.sidenavService.opened = action === 'swiperight';

    action === 'swiperight'
      ? this.sidenav?.open()
      : this.sidenav?.close();
  }
}