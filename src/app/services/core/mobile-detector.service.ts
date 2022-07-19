import { Injectable } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { map, Observable, shareReplay, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MobileDetectorService {
  public isMobile$?: Observable<boolean>;
  public isMobile: boolean = false;

  constructor(private breakpointObserver: BreakpointObserver) {
    this.isMobile$ = this.breakpointObserver.observe(['(min-width: 500px)'])
      .pipe(map(s => !s.matches)).pipe(shareReplay());
    this.isMobile$.subscribe(isMobile => this.isMobile = isMobile);
  }
}
