import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
import { MobileDetectorService } from 'src/app/services/core/mobile-detector.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent implements OnInit {
  protected users$?: Observable<User[]>;
  protected selectedUser?: User;

  @Output() protected selectedWhileMobile = new EventEmitter()

  constructor(
    private dataService: DataService,
    protected mobileDetectorService: MobileDetectorService,
  ) { }

  ngOnInit(): void {
    this.users$ = this.dataService.getUsers();
  }

  protected identify(index: number, item: User) {
    return item.id;
  }

  protected onSelection(user: User) {
    this.mobileDetectorService.isMobile$?.subscribe(isMobile => isMobile && this.selectedWhileMobile.emit())
  }
}
