import { AfterViewInit, ChangeDetectionStrategy, Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatSelectionList } from '@angular/material/list';
import { Observable, shareReplay, tap } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
import { MobileDetectorService } from 'src/app/services/core/mobile-detector.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent {
  protected users$?: Observable<User[]>;
  protected selectedUser?: User;

  @Output() protected selectedWhileMobile = new EventEmitter<User>()
  @Output() protected selected = new EventEmitter<User>()
  
  @ViewChild('users') public users?: MatSelectionList;

  constructor(
    private dataService: DataService,
    protected mobileDetectorService: MobileDetectorService,
  ) {
    this.users$ = this.dataService.getUsers().pipe(shareReplay());
  }

  protected identify(index: number, item: User) {
    return item.id;
  }

  protected onSelection(user: User) {
    // Mean first select while itteration and async list view is not yet ready
    if (!user) {
      this.emitOutside(this.users?.selectedOptions.selected[0].value);
      return;
    }

    this.emitOutside(user);
  }

  private emitOutside(user: User) {
    this.mobileDetectorService.isMobile && this.selectedWhileMobile.emit(user);
    this.selected.emit(user);
  }
}
