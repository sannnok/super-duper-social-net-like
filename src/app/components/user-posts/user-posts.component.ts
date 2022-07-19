import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { map, shareReplay, tap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { Post } from 'src/app/interfaces/post.interface';
import { User } from 'src/app/interfaces/user.interface';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserPostsComponent implements OnChanges {
  @Input() public user?: User;
  @Output() public postCount = new EventEmitter<number>();

  protected posts$?: Observable<Post[]>;

  constructor(private dataService: DataService) {
    this.posts$ = this.dataService.getPosts().pipe(shareReplay());
  }

  ngOnChanges(): void {
    this.posts$ = this.posts$?.pipe(
      map(posts => posts.filter(post => post.userId === this.user?.id)),
      tap(posts => {
        this.postCount.emit(posts.length)
      }));
  }

  protected identify(index: number, item: Post) {
    return item.id;
  }
}
