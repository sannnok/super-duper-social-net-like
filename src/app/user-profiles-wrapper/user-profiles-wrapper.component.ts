import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MobileDetectorService } from '../services/mobile-detector.service';

@Component({
  selector: 'app-user-profiles-wrapper',
  templateUrl: './user-profiles-wrapper.component.html',
  styleUrls: ['./user-profiles-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfilesWrapperComponent implements OnInit {

  constructor(protected mobileDetectorService: MobileDetectorService) { }

  ngOnInit(): void {
  }

}
