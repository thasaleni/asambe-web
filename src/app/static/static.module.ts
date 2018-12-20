import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';

import { StaticRoutingModule } from './static-routing.module';
import { AboutComponent } from './about/about.component';
import { LandingComponent } from './landing/landing.component';
import { ListTripsComponent } from './list-trips/list-trips.component';
import { ChooseRouteComponent } from './choose-route/choose-route.component';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { ListUsersComponent } from './list-users/list-users.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { DriverDetailsComponent } from './driver-details/driver-details.component';
import { ConfirmPhoneComponent } from './confirm-phone/confirm-phone.component';
@NgModule({
  imports: [GooglePlaceModule, SharedModule, StaticRoutingModule],
  declarations: [
    AboutComponent,
    LandingComponent,
    ListTripsComponent,
    ChooseRouteComponent,
    ListUsersComponent,
    SignUpComponent,
    DriverDetailsComponent,
    ConfirmPhoneComponent
  ]
})
export class StaticModule {}
