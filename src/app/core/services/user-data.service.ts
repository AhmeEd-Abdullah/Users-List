import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CachingService } from './caching.service';
import { User } from '../../user.model';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  private userSubject: BehaviorSubject<User[]>;
  private cacheKey: string;
  keyword: string;

  constructor(
    private http: HttpClient,
    private cachingService: CachingService
  ) {
    this.userSubject = new BehaviorSubject<User[]>([]);
    this.cacheKey = 'userData';
    this.keyword = 'user';
  }

  fetchData(id: string): BehaviorSubject<User[]> {
    if (this.cachingService.has(this.cacheKey + id, this.keyword)) {
      return this.cachingService.get(this.cacheKey + id, this.keyword);
    } else {
      this.http
        .get<User[]>(`https://jsonplaceholder.typicode.com/users/${id}`)
        .subscribe((user) => {
          this.cachingService.set(this.cacheKey + id, user, this.keyword);
          this.userSubject.next(user);
        });
      return this.userSubject;
    }
  }
}
