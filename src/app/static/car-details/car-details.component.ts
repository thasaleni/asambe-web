import { Component, OnInit } from '@angular/core';
import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core/animations/route.animations';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ValidatorFn,
  AbstractControl
} from '@angular/forms';
import { Router } from '@angular/router';
import { Car, Trip } from '@app/store/trip.model';
import { HttpService } from '@app/core/http/http-service';
import { environment } from '@env/environment';
import { User } from '@app/store/user.model';
import { Route } from '@app/store/route.model.';
import { of, Observable } from 'rxjs';

@Component({
  selector: 'asmb-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css']
})
export class CarDetailsComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  valid = false;
  form: FormGroup;
  existingForm;
  FormGroup;
  car: Car = {
    id: '',
    make: '',
    model: '',
    registration: '',
    user: null,
    capacity: 0,
    year: ''
  };
  existingCars: Observable<Car[]>;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private httpService: HttpService<Car>,
    private httpCarService: HttpService<Car[]>
  ) {}
  submit() {
    this.car = this.form.value;
    this.car.user = JSON.parse(sessionStorage.getItem('user'));
    sessionStorage.setItem('car', JSON.stringify(this.car));
    const route: Route = <Route>JSON.parse(sessionStorage.getItem('route'));
    this.httpService
      .post(environment.apiUrl + '/cars/new', this.car)
      .subscribe(res => {
        if (res) {
          const trip: Trip = new Trip();
          trip.owner = this.car.user;
          trip.car = <Car>(<unknown>res);
          trip.departureDate = route.departureDate;
          trip.maxPassengers = trip.car.capacity;
          trip.owner.route = route;
          this.httpService
            .post(environment.apiUrl + '/trip/new', trip)
            .subscribe();

          sessionStorage.setItem('trip', JSON.stringify(trip));
          sessionStorage.setItem('car', JSON.stringify(this.car));
          this.router.navigate(['list-trips']);
        }
      });
  }
  ngOnInit() {
    this.form = this.fb.group({
      model: ['', [Validators.required]],
      make: ['', [Validators.required]],
      year: ['', [Validators.required]],
      registration: ['', [Validators.required]],
      capacity: ['', [Validators.required, Validators.min(2)]]
    });
    this.existingForm = this.fb.group({
      existing: ['']
    });
    const user = <User>JSON.parse(sessionStorage.getItem('user'));
    this.httpCarService
      .get(environment.apiUrl + '/cars?email=' + user.email)
      .subscribe(res => {
        this.existingCars = of(<Car[]>(<any>res));
      });
    this.existingForm.controls['existing'].valueChanges.subscribe(formValue => {
      this.existingCars.subscribe(value => {
        const selected = value.find(
          v => v.registration.trim() === formValue.registration.trim()
        );
        this.form.setValue({
          model: selected.model,
          make: selected.make,
          year: selected.year,
          registration: selected.registration,
          capacity: selected.capacity
        });
        this.form.updateValueAndValidity();
      });
    });
  }
}
