import { Component, OnInit } from '@angular/core';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';
import { Router } from '@angular/router';
import { Route } from '@app/store/route.model.';
import { Driver } from '@app/store/user.model';
import { counter } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'asmb-choose-route',
  templateUrl: './choose-route.component.html',
  styleUrls: ['./choose-route.component.css']
})
export class ChooseRouteComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  valid = false;
  form: FormGroup;
  options: any = {
    types: [],
    componentRestrictions: [{ country: ['ZA', 'US'] }]
  };
  route: Route = { from: '', fromId: '', to: '', toId: '' };
  constructor(private fb: FormBuilder, private router: Router) {}

  submit() {
    sessionStorage.setItem('route', JSON.stringify(this.route));
    const type = sessionStorage.getItem('type');
    if (type === 'Driver') {
      this.router.navigate(['list-users']);
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
      this.route.fromProvince = address.address_components[2]
        ? address.address_components[2].long_name
        : null;
    } else {
      console.log(address);
      this.route.to = address.formatted_address;
      this.route.toId = address.place_id;
      this.route.toProvince = address.address_components[2]
        ? address.address_components[2].long_name
        : null;
    }
    if (this.route.fromId && this.route.toId) {
      this.valid = true;
    }
  }
  ngOnInit() {
    this.form = this.fb.group({
      autosave: false,
      from: ['', [Validators.required]],
      to: ['', [Validators.required]]
    });
  }
}
