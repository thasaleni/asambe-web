import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { LandingComponent } from './landing/landing.component';
import { ListTripsComponent } from './list-trips/list-trips.component';
import { ChooseRouteComponent } from './choose-route/choose-route.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthGuardService } from '@app/core';

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
    path: 'list-trips',
    component: ListTripsComponent,
    data: { title: 'asamb.menu.list-trips' },
    canActivate: [AuthGuardService]
  },
  {
    path: 'register',
    component: SignUpComponent,
    data: { title: 'asamb.menu.sign-up' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaticRoutingModule {}
