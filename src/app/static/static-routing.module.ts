import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { LandingComponent } from './landing/landing.component';
import { ListTripsComponent } from './list-trips/list-trips.component';
import { ChooseRouteComponent } from './choose-route/choose-route.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthGuardService } from '@app/core';
import { ConfirmPhoneComponent } from './confirm-phone/confirm-phone.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { CarDetailsComponent } from './car-details/car-details.component';

const routes: Routes = [
  {
    path: 'about',
    component: AboutComponent,
    data: { title: 'asmb.menu.about' }
  },
  {
    path: 'landing',
    component: LandingComponent,
    data: { title: 'asmb.menu.landing' }
  },
  {
    path: 'choose-route',
    component: ChooseRouteComponent,
    data: { title: 'asamb.menu.choose-route' }
  },
  {
    path: 'car-details',
    component: CarDetailsComponent,
    data: { title: 'asamb.menu.car-details' },
    canActivate: [AuthGuardService]
  },
  {
    path: 'list-trips',
    component: ListTripsComponent,
    data: { title: 'asamb.menu.list-trips' },
    canActivate: [AuthGuardService]
  },
  {
    path: 'list-users',
    component: ListUsersComponent,
    data: { title: 'asamb.menu.list-users' },
    canActivate: [AuthGuardService]
  },
  {
    path: 'register',
    component: SignUpComponent,
    data: { title: 'asamb.menu.sign-up' }
  },
  {
    path: 'confirm-phone',
    component: ConfirmPhoneComponent,
    data: { title: 'asamb.menu.confirm-phone' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaticRoutingModule {}
