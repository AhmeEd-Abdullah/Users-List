import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CachingService {
  private cacheUsers: { [key: string]: any };
  private cacheUser: { [key: string]: any };

  constructor() {
    this.cacheUsers = {};
    this.cacheUser = {};
  }

  has(key: string, cachingType: string): any {
    if (cachingType === 'users') {
      return this.cacheUsers.hasOwnProperty(key);
    } else {
      return this.cacheUser.hasOwnProperty(key);
    }
  }

  get(key: string, cachingType: string): any {
    if (cachingType === 'users') {
      return this.cacheUsers[key];
    } else {
      return this.cacheUser[key];
    }
  }

  set(key: string, value: any, cachingType: string): void {
    if (cachingType === 'users') {
      this.cacheUsers[key] = value;
    } else {
      this.cacheUser[key] = value;
    }
  }
}
