import { ChangeDetectionStrategy, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { User } from 'src/app/interfaces/user.interface';
import { SidenavService } from 'src/app/services/core/sidenav.service';
import { MobileDetectorService } from '../../services/core/mobile-detector.service';
import { UserPostsComponent } from '../user-posts/user-posts.component';

@Component({
  selector: 'app-user-profiles-wrapper',
  templateUrl: './user-profiles-wrapper.component.html',
  styleUrls: ['./user-profiles-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfilesWrapperComponent implements OnInit {
  @ViewChild('posts', { static: true }) public posts?: TemplateRef<UserPostsComponent>;
  @ViewChild('geo', { static: true }) public geo?: TemplateRef<any>;
  protected selectedUser?: User;
  protected changedTab: any;

  protected tabs?: {
    label: string,
    templateRef: TemplateRef<any>
  }[]

  constructor(
    protected mobileDetectorService: MobileDetectorService,
    protected sidenavService: SidenavService,
  ) { }

  ngOnInit(): void {
    this.tabs = [{
      label: 'Posts',
      templateRef: this.posts as TemplateRef<any>
    },
    {
      label: 'Geo',
      templateRef: this.geo as TemplateRef<any>
    }
  ]
  }

  onUserSelect(user: User) {
    this.selectedUser = user;
    this.sidenavService.opened = false
  }

  onUserSelectedWhileMobile(user: User, drawer: MatDrawer) {
    drawer.close();
    this.onUserSelect(user);
  }

  onPostCountFinish(postLength: number) {
    const postTab = this.tabs?.find(tab => tab.label.includes('Posts'));
    if(postTab) {
      postTab.label = `${postLength} Posts`
    }
  }

  onTabChanged(event: any) {
    this.changedTab = event;
  }
}
