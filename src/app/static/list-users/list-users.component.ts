import { Component, OnInit } from '@angular/core';
import { User } from '@app/store/user.model';
import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';
import { HttpService } from '@app/core/http/http-service';
import { Route } from '@app/store/route.model.';
import { environment } from '@env/environment';

@Component({
  selector: 'asmb-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  users: User[];
  user: User;
  constructor(private httpService: HttpService<User[]>) {}
  ngOnInit() {
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.httpService
      .get(environment.apiUrl + '/users/byRoute?email=' + this.user.email)
      .subscribe(res => {
        if (res.ok) {
          this.users = res.body;
        } else if (res) {
          const forcedRes: any = res;
          this.users = <User[]>forcedRes;
        }
      });
  }

  openLink(link: string) {
    window.open(link, '_blank');
  }
}
