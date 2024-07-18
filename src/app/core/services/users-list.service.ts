import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CachingService } from './caching.service';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersListService {
  private usersSubject: BehaviorSubject<User[]>;
  private cacheKey: string;
  keyword: string;

  constructor(
    private http: HttpClient,
    private cachingService: CachingService
  ) {
    this.usersSubject = new BehaviorSubject<User[]>([]);
    this.cacheKey = 'usersList';
    this.keyword = 'users';
  }

  fetchUsers(): BehaviorSubject<User[]> {
    if (this.cachingService.has(this.cacheKey, this.keyword)) {
      return this.cachingService.get(this.cacheKey, this.keyword);
    } else {
      this.http
        .get<User[]>('https://jsonplaceholder.typicode.com/users')
        .subscribe((users) => {
          this.cachingService.set(this.cacheKey, users, this.keyword);
          this.usersSubject.next(users);
        });
      return this.usersSubject;
    }
  }
}
