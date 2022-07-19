import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { User } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPageComponent implements OnChanges {
  protected loading = false;

  @Input() public user?: User;

  constructor() { }

  ngOnChanges() {
    this.loading = true;
  }

  onImageLoad() {
    this.loading = false;
  }
}
