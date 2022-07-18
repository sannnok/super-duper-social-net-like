import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer, MatSidenav } from '@angular/material/sidenav';
import { MobileDetectorService } from '../services/core/mobile-detector.service';

@Component({
  selector: 'app-user-profiles-wrapper',
  templateUrl: './user-profiles-wrapper.component.html',
  styleUrls: ['./user-profiles-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfilesWrapperComponent implements OnInit {
  constructor(
    protected mobileDetectorService: MobileDetectorService,
  ) { }

  ngOnInit(): void {
  }

}
