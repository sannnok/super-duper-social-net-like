import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces/user.interface';
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

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.users$ = this.dataService.getUsers();
  }

  protected identify(index: number, item: User) {
    return item.id;
  }
}
