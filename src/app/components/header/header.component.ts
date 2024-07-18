import { Component, Input } from '@angular/core';
import { User } from '../../user.model';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Input() users!: User[];
  userIds!: any[];
  searchResult!: User[];
  userExist!: boolean;
  userNotExist!: boolean;

  constructor(private router: Router) {}

  Search(userId: string) {
    this.setUsersId(this.users);
    if (userId == '') {
      this.userExist = false;
      this.userNotExist = false;
    } else if (this.userIds.indexOf(+userId) != -1) {
      this.searchResult = this.users.filter((user) => +user.id === +userId);
      this.userExist = true;
      this.userNotExist = false;
    } else {
      this.userNotExist = true;
      this.userExist = false;
    }
  }

  setUsersId(users: User[]) {
    this.userIds = users.map((user) => user.id);
  }

  navigateUser(id: number) {
    this.router.navigate([`users/${id}`]);
  }
}
