import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';
import { MobileDetectorService } from '../../services/core/mobile-detector.service';

@Component({
  selector: 'app-user-profiles-wrapper',
  templateUrl: './user-profiles-wrapper.component.html',
  styleUrls: ['./user-profiles-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfilesWrapperComponent implements OnInit {
  protected selectedUser?: User;

  constructor(
    protected mobileDetectorService: MobileDetectorService,
  ) { }

  ngOnInit(): void {
  }

  onUserSelect(user: User) {
    this.selectedUser = user;
    console.log('onUserSelect, ', user)
  }
}
