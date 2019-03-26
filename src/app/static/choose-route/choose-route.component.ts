import { Component, OnInit } from '@angular/core';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ROUTE_ANIMATIONS_ELEMENTS, routeAnimations } from '@app/core';
import { Router } from '@angular/router';
import { Route } from '@app/store/route.model.';
import { Driver } from '@app/store/user.model';
import { counter } from '@fortawesome/fontawesome-svg-core';
import { Trip } from '@app/store/trip.model';

@Component({
  selector: 'asmb-choose-route',
  templateUrl: './choose-route.component.html',
  styleUrls: ['./choose-route.component.css']
})
export class ChooseRouteComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  valid = false;
  form: FormGroup;
  minDate: Date = new Date();
  options: any = {
    types: [],
    componentRestrictions: { country: 'ZA' }
  };
  route: Route = {
    from: '',
    fromId: '',
    to: '',
    toId: '',
    departureDate: null
  };
  trip: Trip = {
    id: '',
    owner: null,
    car: null,
    creationDate: new Date(),
    departureDate: new Date(),
    route: null,
    maxPassengers: 0,
    passengers: []
  };
  constructor(private fb: FormBuilder, private router: Router) {}

  submit() {
    sessionStorage.setItem('route', JSON.stringify(this.route));
    const type = sessionStorage.getItem('type');

    if (type === 'Driver') {
      this.router.navigate(['car-details']);
    } else {
      this.router.navigate(['list-trips']);
    }
  }
  handleAddressChange(id: string, address: Address) {
    console.log(address.address_components[2]);
    if (id === 'from') {
      console.log(address);
      this.route.from = address.formatted_address;
      this.route.fromId = address.place_id;
      this.route.fromProvince = this.getProvince(address);
    } else {
      console.log(address);
      this.route.to = address.formatted_address;
      this.route.toId = address.place_id;
      this.route.toProvince = this.getProvince(address);
    }
    // if (this.route.fromId && this.route.toId && this.form.get('departureDate').value) {
    //   this.valid = true;
    // }
  }
  getProvince(address: Address): string {
    if (
      address.address_components[2] &&
      address.address_components[2].long_name !==
        address.address_components[1].long_name
    ) {
      return address.address_components[2].long_name;
    } else if (address.address_components[3].long_name) {
      return address.address_components[3].long_name;
    } else {
      return null;
    }
  }
  ngOnInit() {
    this.form = this.fb.group({
      autosave: false,
      from: ['', [Validators.required]],
      to: ['', [Validators.required]],
      departureDate: ['', [Validators.required]]
    });
  }
}
