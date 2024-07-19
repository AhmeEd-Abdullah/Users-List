import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { UsersListService } from '../../core/services/users-list.service';
import { CachingService } from '../../core/services/caching.service';
import { RouterLink } from '@angular/router';
import { LoaderComponent } from '../loader/loader.component';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    RouterLink,
    HeaderComponent,
    LoaderComponent,
    CommonModule,
    NgxPaginationModule,
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent implements OnInit {
  usersList: any;
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(
    private userListService: UsersListService,
    private cachingService: CachingService
  ) {
    this.usersList = [];
  }

  ngOnInit(): void {
    this.getUsersList();
  }

  getUsersList() {
    const cacheKey = 'usersList';
    if (this.cachingService.has(cacheKey, 'users')) {
      this.usersList = this.userListService.fetchUsers();
    } else {
      this.userListService.fetchUsers().subscribe((users) => {
        this.usersList = users;
      });
    }
  }
}
