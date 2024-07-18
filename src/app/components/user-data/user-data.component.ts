import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../../core/services/user-data.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CachingService } from '../../core/services/caching.service';
import { JsonPipe, KeyValuePipe } from '@angular/common';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-user-data',
  standalone: true,
  imports: [KeyValuePipe, JsonPipe, RouterLink, LoaderComponent],
  templateUrl: './user-data.component.html',
  styleUrl: './user-data.component.scss',
})
export class UserDataComponent implements OnInit {
  userData: any;
  // loading: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userDataService: UserDataService,
    private cachingService: CachingService
  ) {}

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData() {
    // this.loading = true;
    const userId = this.activatedRoute.snapshot.params['id'];
    const cacheKey = 'userData';
    if (this.cachingService.has(cacheKey + userId, 'user')) {
      this.userData = this.userDataService.fetchData(userId);
      // this.loading = false;
    } else {
      this.userDataService.fetchData(userId).subscribe((user) => {
        this.userData = user;
        // this.loading = false;
      });
    }
  }
}
