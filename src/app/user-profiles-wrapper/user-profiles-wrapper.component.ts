import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profiles-wrapper',
  templateUrl: './user-profiles-wrapper.component.html',
  styleUrls: ['./user-profiles-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfilesWrapperComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
