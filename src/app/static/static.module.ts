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
import { ConfirmPhoneComponent } from './confirm-phone/confirm-phone.component';
import { CarDetailsComponent } from './car-details/car-details.component';
import { ProfileComponent } from './profile/profile.component';
import { ActiveTripComponent } from './active-trip/active-trip.component';
import { PaymentComponent } from './payment/payment.component';
@NgModule({
  imports: [GooglePlaceModule, SharedModule, StaticRoutingModule],
  declarations: [
    AboutComponent,
    LandingComponent,
    ListTripsComponent,
    ChooseRouteComponent,
    ListUsersComponent,
    SignUpComponent,
    ConfirmPhoneComponent,
    CarDetailsComponent,
    ProfileComponent,
    ActiveTripComponent,
    PaymentComponent
  ]
})
export class StaticModule {}
