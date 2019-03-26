import { Driver, User } from './user.model';
import { Route } from './route.model.';

export class Trip {
  id: string;
  owner: User;
  car: Car;
  creationDate: Date;
  departureDate: Date;
  route: Route;
  maxPassengers: number;
  passengers: User[];
}
export class Car {
  id: string;
  user: User;
  model: string;
  make: string;
  year: string;
  registration: string;
  capacity: number;
}
