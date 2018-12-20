import { Component, OnInit } from '@angular/core';
import { User } from '@app/store/user.model';

@Component({
  selector: 'asmb-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {
  users: User[];
  constructor() {}

  ngOnInit() {}
}
