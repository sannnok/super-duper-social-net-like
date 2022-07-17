import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, shareReplay } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { Post } from '../interfaces/post.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(environment.api.users).pipe(shareReplay());
  }

  getPosts(): Observable<Post[]>  {
    return this.http.get<Post[]>(environment.api.posts).pipe(shareReplay());
  }
}
