import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';
import { Feature, features } from './landing.data';
import { Router } from '@angular/router';
import { User, Driver } from '@app/store/user.model';

@Component({
  selector: 'asmb-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  features: Feature[] = features;
  constructor(private router: Router) {}
  ngOnInit() {}

  openLink(link: string) {
    window.open(link, '_blank');
  }
  handleClick(type: string) {
    localStorage.clear();
    sessionStorage.setItem('type', type);
    this.router.navigate(['choose-route']);
  }
}
