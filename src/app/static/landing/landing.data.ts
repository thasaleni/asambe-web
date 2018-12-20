import { environment as env } from '@env/environment';
import { User, Driver } from '@app/store/user.model';
import { Trip } from '@app/store/trip.model';

export interface Feature {
  name: string;
  version?: string;
  description: string;
  github?: string;
  documentation: string;
  medium?: string;
  type?: string;
}

export const features: Feature[] = [
  {
    name: 'Driving',
    version: env.versions.angular,
    description: 'asmb.landing.driver-description',
    github: 'https://github.com/angular/angular',
    documentation: 'https://angular.io/docs/ts/latest/',
    type: 'driver'
  },
  {
    name: 'Riding',
    version: env.versions.material,
    description: 'asmb.landing.passenger-description',
    github: 'https://github.com/angular/material2/',
    documentation: 'https://material.angular.io/',
    type: 'passenger'
  }
];
