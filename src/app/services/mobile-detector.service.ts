import { Injectable } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MobileDetectorService {
  public isMobile$?: Observable<boolean>;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.isMobile$ = this.breakpointObserver.observe(['(min-width: 500px)']).pipe(map(s => !s.matches), tap(() => console.log('triggered')));
  }
}
