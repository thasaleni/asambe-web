import { Component, OnInit } from '@angular/core';
import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';
import { Trip } from '@app/store/trip.model';
import { HttpService } from '@app/core/http/http-service';
import { environment } from '@env/environment';
import { Route } from '@app/store/route.model.';
import { User } from '@app/store/user.model';

@Component({
  selector: 'asmb-list-trips',
  templateUrl: './list-trips.component.html',
  styleUrls: ['./list-trips.component.scss']
})
export class ListTripsComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  trips: Trip[];
  user: User;
  constructor(private httpService: HttpService<Trip[]>) {}
  ngOnInit() {
    const fromProvince = <Route>(
      JSON.parse(sessionStorage.getItem('route')).fromProvince
    );
    const toProvince = <Route>(
      JSON.parse(sessionStorage.getItem('route')).toProvince
    );
    this.httpService
      .get(
        environment.apiUrl +
          '/trips?route.fromProvince=' +
          fromProvince +
          '&route.toProvince=' +
          toProvince
      )
      .subscribe(res => {
        if (res.ok) {
          this.trips = res.body;
        } else if (res) {
          const forcedRes: any = res;
          this.trips = <Trip[]>forcedRes;
        }
      });
  }

  openLink(link: string) {
    window.open(link, '_blank');
  }
}
