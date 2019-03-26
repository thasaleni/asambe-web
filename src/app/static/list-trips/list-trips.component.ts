import { Component, OnInit } from '@angular/core';
import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';
import { Trip } from '@app/store/trip.model';
import { HttpService } from '@app/core/http/http-service';
import { environment } from '@env/environment';
import { Route } from '@app/store/route.model.';
import { User, Driver } from '@app/store/user.model';
import { userInfo } from 'os';

@Component({
  selector: 'asmb-list-trips',
  templateUrl: './list-trips.component.html',
  styleUrls: ['./list-trips.component.scss']
})
export class ListTripsComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  trips: Trip[];
  trip: Trip;
  user: User;
  constructor(private httpService: HttpService<Trip[]>) {}
  ngOnInit() {
    const isDriver = sessionStorage.getItem('type') === 'Driver';
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.setTrip(isDriver);
    const fromProvince = <Route>(
      JSON.parse(sessionStorage.getItem('route')).fromProvince
    );
    const toProvince = <Route>(
      JSON.parse(sessionStorage.getItem('route')).toProvince
    );
    this.httpService
      .get(
        environment.apiUrl +
          '/trip/byProvince?fromProvince=' +
          fromProvince +
          '&toProvince=' +
          toProvince +
          '&me=' +
          this.user.email
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
  setTrip(isDriver: boolean) {
    const route = <Route>JSON.parse(sessionStorage.getItem('route'));
    this.trip = JSON.parse(sessionStorage.getItem('trip'));
    if (isDriver) {
      this.trip.car = JSON.parse(sessionStorage.getItem('car'));
    }
  }
  openLink(link: string) {
    window.open(link, '_blank');
  }
}
