import {
  AfterViewInit,
  Component,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { UsersListService } from '../../core/services/users-list.service';
import { CachingService } from '../../core/services/caching.service';
import { RouterLink } from '@angular/router';
import { LoaderComponent } from '../loader/loader.component';
import { PaginationStatus } from '../../pagination.model';

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [RouterLink, HeaderComponent, LoaderComponent],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
})
export class UsersListComponent implements OnInit {
  usersList: any;
  // loading: boolean = false;

  // tableData: any[] = [];
  // totalRecords = 0;
  // paginationStatus: PaginationStatus = {
  //   page: 1,
  //   pageSize: 5,
  //   totalPages: 0,
  // };

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
    // this.loading = true;
    const cacheKey = 'usersList';
    if (this.cachingService.has(cacheKey, 'users')) {
      this.usersList = this.userListService.fetchUsers();
      // this.loading = false;
    } else {
      this.userListService.fetchUsers().subscribe((users) => {
        this.usersList = users;
        // this.loading = false;
      });
    }
  }

  // initialPagination() {
  //   this.totalRecords = this.usersList.length;
  //   this.paginationStatus = {
  //     ...this.paginationStatus,
  //     totalPages: Math.ceil(this.totalRecords / this.paginationStatus.pageSize),
  //   };
  //   this.refreshTable();
  // }

  // refreshTable() {
  //   let data = this.usersList;

  //   this.tableData = data.slice(
  //     (this.paginationStatus.page - 1) * this.paginationStatus.pageSize,
  //     (this.paginationStatus.page - 1) * this.paginationStatus.pageSize +
  //       this.paginationStatus.pageSize
  //   );
  // }
}
