import { Driver, User } from './user.model';
import { Route } from './route.model.';

export class Trip {
  id: number;
  owner: Driver;
  creationDate: String;
  departureDate: String;
  route: Route;
  maxPassengers: number;
  passengers: User[];
}
